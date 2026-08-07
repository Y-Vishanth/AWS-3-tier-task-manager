const connectDB = require('./config/db');
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask
} = require('./controllers/taskController');

exports.handler = async (event) => {

  await connectDB();

  const method = event.requestContext.http.method;

  const id = event.queryStringParameters?.id;

  let body = {};

  if (event.body) {
    body = JSON.parse(event.body);
  }

  const req = {
    body,
    params: {
      id
    }
  };

  return new Promise(async (resolve) => {

    const res = {

      status(code) {

        this.statusCode = code;

        return this;

      },

      json(data) {

        resolve({

          statusCode: this.statusCode || 200,

          headers: {

            "Content-Type": "application/json",

            "Access-Control-Allow-Origin": "*"

          },

          body: JSON.stringify(data)

        });

      }

    };

    switch (method) {

      case "GET":

        await getTasks(req, res);

        break;

      case "POST":

        await createTask(req, res);

        break;

      case "PUT":

        await updateTask(req, res);

        break;

      case "DELETE":

        await deleteTask(req, res);

        break;

      default:

        resolve({

          statusCode: 405,

          body: JSON.stringify({

            message: "Method Not Allowed"

          })

        });

    }

  });

};
