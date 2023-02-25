"use strict";

const axios = require("axios")
const express = require("express"); // npm i express
const cors = require("cors"); // npm i cors
require("dotenv").config();
const router = express.Router();
const mongoose = require('mongoose');
const { Schema } = require('mongoose');



mongoose.connect('mongodb://127.0.0.1:27017/patient_database', { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to database');
});



// const notFoundHandler = require('./libraries/notFound');
const unsplash = require('./libraries/unsplash');
const LoggerMiddleware = require('./middlewares/logger')
const validator = require('./middlewares/validate');
const errorHandler = require('./handlers/500');
const notFoundHandler = require('./handlers/404')
const patientSubmitter = require('./libraries/patientSubmitter')

const app = express();
app.use(express.json());

app.use(cors());
app.use(LoggerMiddleware);


const PORT = process.env.PORT || 3001;


// const patientSchema = new Schema({
//   patientName: String,
//   age: Number,
//   bloodType: String,
// });

// const patientModel = mongoose.model('patientModel', patientSchema);



  //const { patientName, age, bloodType } = req.body;


// Routes/Endpoints
app.get("/", homeHandler);
app.get("/searchImage",validator, unsplash.searchImageHandler);
app.get("/randomImage", unsplash.randomImageHandler);
app.post('/submit', patientSubmitter.addPatientHandler);
app.get('/allPatients', patientSubmitter.getAllPatientsHandler)
app.get("*", notFoundHandler);



// Routes Handlers
function homeHandler(request, response) {
  console.log(request.query)
  response.send("Hello world!");
  
}

async function getAllPatientsHandler(req, res) {
  let productsapi = await axios.get(
    "http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline"
  );
  res.status(200).send(productsapi.data);
}

app.use(errorHandler);

app.listen(PORT, () => console.log(`listening on ${PORT}`));


module.exports = {
  app: app,
  // Schema: patientModel,
  // patientSchema,
}


