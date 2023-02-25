"use strict";

const express = require("express"); // npm i express
const cors = require("cors"); // npm i cors
require("dotenv").config();

// const notFoundHandler = require('./libraries/notFound');
const unsplash = require('./libraries/unsplash');
const LoggerMiddleware = require('./middlewares/logger')
const validator = require('./middlewares/validate');
const errorHandler = require('./handlers/500');
const notFoundHandler = require('./handlers/404')

const app = express();

app.use(cors());
app.use(LoggerMiddleware);


const PORT = process.env.PORT || 3001;

// Routes/Endpoints
app.get("/", homeHandler);
app.get("/searchImage",validator, unsplash.searchImageHandler);
app.get("/randomImage", unsplash.randomImageHandler);
app.get("*", notFoundHandler);

// Routes Handlers
function homeHandler(request, response) {
  response.send("Hello world!");
}

app.use(errorHandler);

app.listen(PORT, () => console.log(`listening on ${PORT}`));


module.exports = {
  app: app
}