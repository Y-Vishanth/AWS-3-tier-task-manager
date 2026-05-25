# 🚀 AWS 3-Tier Task Manager Application

![image alt](https://github.com/Y-Vishanth/AWS-3-tier-task-manager/blob/d291dfff2c4a7c3bdb68d7b8ad4612b2a755826d/3.1.jpeg)

A production-style full-stack Task Manager application deployed completely on AWS using modern DevOps and Cloud technologies.

This project demonstrates how a frontend, backend, and database communicate in a real-world cloud-native architecture using:

- React + Vite
- Node.js + Express
- MongoDB Atlas
- Docker
- Amazon ECS Fargate
- Amazon ECR
- Application Load Balancer (ALB)
- Amazon S3
- Amazon CloudFront
- AWS Secrets Manager

---

# 🌐 Live Application

## Frontend URL (CloudFront CDN)

```bash
https://YOUR-CLOUDFRONT-URL
```

---

# 📌 Project Architecture

```text
                ┌──────────────────────┐
                │      End User        │
                └──────────┬───────────┘
                           │
                           ▼
                ┌──────────────────────┐
                │    CloudFront CDN    │
                │  (Frontend Delivery) │
                └──────────┬───────────┘
                           │
                           ▼
                ┌──────────────────────┐
                │      S3 Bucket       │
                │  React Static Files  │
                └──────────┬───────────┘
                           │
                           ▼
                ┌──────────────────────┐
                │ Application Load     │
                │     Balancer (ALB)   │
                └──────────┬───────────┘
                           │
                           ▼
                ┌──────────────────────┐
                │   ECS Fargate Task   │
                │ Node.js Backend API  │
                └──────────┬───────────┘
                           │
                           ▼
                ┌──────────────────────┐
                │   MongoDB Atlas DB   │
                └──────────────────────┘
```

---

# 🧠 How This Application Works

When a user adds a task from the frontend UI:

```text
1. User enters a task in React frontend
        ↓
2. Frontend sends API request to ALB
        ↓
3. ALB forwards request to ECS Backend
        ↓
4. Node.js backend processes request
        ↓
5. Backend stores task in MongoDB Atlas
        ↓
6. Response sent back to frontend
        ↓
7. Updated tasks displayed to user
```

---

# 🛠️ Tech Stack Used

| Layer | Technology |
|------|-------------|
| Frontend | React + Vite |
| Backend | Node.js + Express |
| Database | MongoDB Atlas |
| Containerization | Docker |
| Container Registry | Amazon ECR |
| Orchestration | Amazon ECS Fargate |
| Load Balancer | Application Load Balancer |
| CDN | Amazon CloudFront |
| Static Hosting | Amazon S3 |
| Secrets Management | AWS Secrets Manager |
| Version Control | Git + GitHub |

---

# ✨ Features

- Add Tasks
- Delete Tasks
- Real-time Task Updates
- Persistent MongoDB Storage
- Dockerized Backend
- ECS Fargate Deployment
- Secure Secret Management
- Load Balanced Backend
- CDN-based Frontend Delivery
- Production-style Cloud Architecture

---

# 📚 Learning Outcomes

This project helped in understanding:

- Docker containerization
- ECS Fargate deployments
- AWS networking concepts
- Security Groups
- Load Balancer integration
- Secrets Manager usage
- Frontend & Backend communication
- CloudFront CDN deployment
- Production-style architecture design
- Real-world DevOps debugging

---

# 📂 Project Structure

```text
aws-3-tier-task-manager/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── Refer → /frontend/src/App.jsx
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── Dockerfile
│   └── Refer → /backend/server.js
│
└── README.md
```

---

# ⚙️ Prerequisites

Before running this project, make sure you have:

- AWS Account
- Node.js Installed
- Docker Installed
- AWS CLI Configured
- Git Installed
- MongoDB Atlas Account

---

# 🚀 Step-by-Step Deployment Guide

# 1️⃣ Clone Repository

```bash
git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
```

```bash
cd YOUR-REPOSITORY
```

---

# 2️⃣ Frontend Setup

Move into frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run frontend locally:

```bash
npm run dev
```

---

# 3️⃣ Backend Setup

Move into backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

---

# 🔐 Configure MongoDB URI

## Step 1 — Create MongoDB Atlas Account

Open:

```text
https://www.mongodb.com/atlas
```

---

## Step 2 — Create Free Cluster

- Choose Free Tier
- Select AWS Region
- Create Cluster

---

## Step 3 — Create Database User

Go to:

```text
Security → Database Access
```

Create:
- Username
- Password

---

## Step 4 — Allow Network Access

Go to:

```text
Security → Network Access
```

Add:

```text
0.0.0.0/0
```

(Only for learning/demo purposes)

---

## Step 5 — Get MongoDB Connection URI

Go to:

```text
Cluster → Connect → Drivers
```

Copy connection string:

```text
mongodb+srv://USERNAME:PASSWORD@cluster.mongodb.net/
```

---

# 4️⃣ Configure Environment Variables

Create `.env` file inside:

```text
/backend/.env
```

Add:

```env
PORT=5000
MONGO_URI=YOUR_MONGODB_URI
```

---

# 5️⃣ Run Backend Locally

Inside backend folder:

```bash
npm run dev
```

Backend should run on:

```bash
http://localhost:5000/tasks
```

---

# 🐳 Dockerization

## Build Docker Image

Refer → `/backend/Dockerfile`

Run:

```bash
docker build -t task-manager-backend .
```

---

# ☁️ Push Docker Image to Amazon ECR

## Authenticate Docker with ECR

```bash
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin YOUR_ECR_URI
```

---

## Tag Image

```bash
docker tag task-manager-backend:latest YOUR_ECR_URI
```

---

## Push Image

```bash
docker push YOUR_ECR_URI
```

---

# 🚢 ECS Fargate Deployment

## Steps Performed

- Created ECS Cluster
- Created Task Definition
- Added Secrets Manager Integration
- Created ECS Service
- Attached Application Load Balancer
- Configured Security Groups
- Enabled Fargate Networking

---

# 🔐 Secrets Manager Integration

MongoDB URI stored securely using:

```text
AWS Secrets Manager
```

Backend accesses secrets using:

```text
ecsTaskExecutionRole
```

---

# 🌍 Frontend Production Deployment

## Build Frontend

Inside frontend folder:

```bash
npm run build
```

This creates:

```text
/frontend/dist
```

---

# 🪣 Deploy Frontend to S3

Create S3 bucket and upload:

```text
Contents inside dist/
```

NOT the dist folder itself.

---

# 🌐 CloudFront CDN Setup

CloudFront used for:

- Global CDN Delivery
- HTTPS Support
- Faster Content Delivery
- Edge Caching

CloudFront Origin:

```text
S3 Static Website Endpoint
```

---

# 🔥 Backend API Flow

Frontend communicates with backend using:

```text
ALB DNS Endpoint
```

Example:

```text
http://YOUR-ALB-DNS/tasks
```

---

# 🧪 API Testing

Test backend APIs using:

- Browser
- Postman
- curl

Example:

```bash
curl http://YOUR-ALB-DNS/tasks
```

---

# ⚠️ Important Notes

- Never upload `.env` files to GitHub
- Never expose MongoDB credentials publicly
- Use AWS Secrets Manager for production
- Use HTTPS in production environments

---

# 🔮 Future Improvements

- Add Authentication
- HTTPS on ALB using ACM
- CI/CD using GitHub Actions
- Terraform Infrastructure as Code
- Auto Scaling
- Route53 Custom Domain
- Monitoring with CloudWatch

---

# 👨‍💻 Author

Built as a hands-on DevOps + Cloud Engineering project to understand real-world production deployment architecture on AWS.

---

# ⭐ If You Found This Useful

Give this repository a ⭐ on GitHub.
