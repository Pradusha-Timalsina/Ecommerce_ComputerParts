const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connection = require("./database");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./middleware/error");
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");

//Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

//

dotenv.config({ path: "Backend/.env" }); //Backend vanne folder bata .env vanne file bolako

// const port = process.env.PORT || 8080;
// const server = app.listen(port, () =>
//   console.log(`Listening on port ${port}...`)
// );

//database connection
connection();

//middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    option: "*",
  })
);
app.use(cookieParser());

//routes
app.use("/api/v1", user);
app.use("/api/v1", product);

//Middleware for Errors
app.use(errorMiddleware);

//process.env ley .env ma vako PORT ko location lai yaa lyauxa
const server = app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});

// unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error:${err.message}`);
  console.log(`shutting down the server due to unhandled Promise Rejection`);
  server.close(() => {
    process.exit(1);
  });
});
