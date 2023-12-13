const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config({ path: "Backend/.env" }); //Backend vanne folder bata .env vanne file bolako

const port = process.env.PORT || 8080; //process.env ley .env ma vako PORT ko location lai yaa lyauxa
const server = app.listen(port, () =>
  console.log(`Listening on port ${port}...`)
);

// unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error:${err.message}`);
  console.log(`shutting down the server due to unhandled Promise Rejection`);
  server.close(() => {
    process.exit(1);
  });
});
