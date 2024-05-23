require("express-async-errors");
const migrationsRun = require("./database/sqlite/migrations")
const appError = require("./utils/app.error");
const express = require("express");
const routes = require("./routes");
migrationsRun();
const app = express();
app.use(express.json());
app.use(routes);

app.use((error, request, response, next) => {
  if (error instanceof appError) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message,
    });
  }
  console.error(error);
  return response.status(500).json({
    status: "error",
    message: "internal server error",
  });

});
const port = 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
