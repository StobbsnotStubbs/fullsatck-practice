"use strict";

const express = require("express"); // npm i express
const cors = require("cors"); // npm i cors
require("dotenv").config();
const router = express.Router();
const mongoose = require('mongoose');
const { Schema } = mongoose;


mongoose.connect('mongodb://127.0.0.1:27017/my_database', { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to database');
});

const patientSchema = new Schema({
  patientName: String,
  age: Number,
  bloodType: String,
});

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


const patientModel = mongoose.model('patientModel', patientSchema);


router.post('/my-route', (req, res) => {
  const { patientName, age, bloodType } = req.body;

  const newRecord = new patientModel({
    patientName,
    age,
    bloodType,
  });

  newRecord.save((err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error saving record');
    } else {
      res.status(200).send('Record saved');
    }
  });
});

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


module.exports = router;