#!/bin/bash

#############################################################
# MongoDB Atlas Backup Script
# Backup Databases:
#   - sample_mflix
#   - test
#
# Upload Destination:
#   Google Cloud Storage
#############################################################

set -e

#############################################################
# Directories
#############################################################

PROJECT_DIR="$(cd "$(dirname "$0")/.." && pwd)"

source "$PROJECT_DIR/.env"

BACKUP_DIR="$PROJECT_DIR/backups"
LOG_DIR="$PROJECT_DIR/logs"

mkdir -p "$BACKUP_DIR"
mkdir -p "$LOG_DIR"

TIMESTAMP=$(date +"%Y-%m-%d_%H-%M-%S")

TEMP_DIR="$BACKUP_DIR/mongodb_backup_$TIMESTAMP"

ARCHIVE_NAME="mongodb_backup_$TIMESTAMP.tar.gz"

ARCHIVE_PATH="$BACKUP_DIR/$ARCHIVE_NAME"

LOG_FILE="$LOG_DIR/backup.log"

BUCKET_NAME="task-manager-mongodb-backups"

#############################################################
# Logging Function
#############################################################

log() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') : $1" | tee -a "$LOG_FILE"
}

START_TIME=$(date +%s)

log "======================================================="
log "MongoDB Backup Started"

#############################################################
# Check mongodump
#############################################################

if ! command -v mongodump >/dev/null 2>&1
then
    log "ERROR : mongodump not installed."
    exit 1
fi

log "mongodump found."

#############################################################
# Check gcloud
#############################################################

if ! command -v gcloud >/dev/null 2>&1
then
    log "ERROR : gcloud CLI not installed."
    exit 1
fi

log "gcloud CLI found."

#############################################################
# Check Authentication
#############################################################

ACTIVE_ACCOUNT=$(gcloud auth list \
--filter=status:ACTIVE \
--format="value(account)")

if [ -z "$ACTIVE_ACCOUNT" ]
then
    log "ERROR : No active Google account."
    exit 1
fi

log "Authenticated as $ACTIVE_ACCOUNT"

#############################################################
# Verify Bucket
#############################################################

if ! gcloud storage ls gs://$BUCKET_NAME >/dev/null 2>&1
then
    log "ERROR : Bucket not found."
    exit 1
fi

log "Bucket verified."

#############################################################
# Create Temporary Directory
#############################################################

mkdir -p "$TEMP_DIR"

#############################################################
# Backup sample_mflix
#############################################################

log "Backing up sample_mflix..."

mongodump \
--uri="$MONGO_URI" \
--db=sample_mflix \
--out="$TEMP_DIR"

#############################################################
# Backup test
#############################################################

log "Backing up test..."

mongodump \
--uri="$MONGO_URI" \
--db=test \
--out="$TEMP_DIR"

#############################################################
# Verify Backup
#############################################################

if [ ! -d "$TEMP_DIR/sample_mflix" ]
then
    log "ERROR : sample_mflix backup failed."
    exit 1
fi

if [ ! -d "$TEMP_DIR/test" ]
then
    log "ERROR : test backup failed."
    exit 1
fi

log "MongoDB backup completed."

#############################################################
# Compress Backup
#############################################################

log "Compressing backup..."

tar -czf "$ARCHIVE_PATH" -C "$BACKUP_DIR" "$(basename "$TEMP_DIR")"

if [ ! -f "$ARCHIVE_PATH" ]
then
    log "ERROR : Compression failed."
    exit 1
fi

ARCHIVE_SIZE=$(du -h "$ARCHIVE_PATH" | cut -f1)

log "Archive created."

log "Archive Size : $ARCHIVE_SIZE"

#############################################################
# Upload to GCS
#############################################################

log "Uploading archive to Google Cloud Storage..."

if gcloud storage cp "$ARCHIVE_PATH" gs://$BUCKET_NAME/
then
    log "Upload successful."
else
    log "ERROR : Upload failed."
    exit 1
fi

#############################################################
# Verify Upload
#############################################################

if gcloud storage ls gs://$BUCKET_NAME/$ARCHIVE_NAME >/dev/null 2>&1
then
    log "Upload verification successful."
else
    log "ERROR : Uploaded archive not found."
    exit 1
fi

#############################################################
# Cleanup
#############################################################

log "Cleaning local files..."

rm -rf "$TEMP_DIR"

rm -f "$ARCHIVE_PATH"

log "Local backup removed."

#############################################################
# Finish
#############################################################

END_TIME=$(date +%s)

TOTAL_TIME=$((END_TIME-START_TIME))

log "Backup Completed Successfully."

log "Execution Time : ${TOTAL_TIME} seconds"

exit 0
