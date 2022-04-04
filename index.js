require('dotenv').config()
const express = require("express");
const server = express();
const { client } = require("./db");
client.connect();
const apiRouter = require("./api");
const morgan = require("morgan");

const {PORT = 3000} = process.env;

server.use(morgan("dev"));

server.use(express.json());

server.use((req, res, next) => {
  console.log("Start up");
  console.log(req.body);
  console.log("End");

  next();
});

server.use("/api", apiRouter);

server.get('/background/:color', (req, res, next) => {
  res.send(`
    <body style="background: ${ req.params.color };">
      <h1>Hello World</h1>
    </body>
  `);
});

server.listen(PORT, () => {
  console.log("The server is up on port", PORT);
});