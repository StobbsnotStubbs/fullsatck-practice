"use strict";

const { faker } = require('@faker-js/faker')
const { Schema } = require('mongoose');
const mongoose = require('mongoose');



const patientSchema = new Schema({
  patientName: String,
  age: Number,
  bloodType: String,
});

const patientModel = mongoose.model('patientModel', patientSchema);

async function addPatientHandler(req,res) {
  console.log(req.body.age)
  console.log("test" + req)
  const {patientName, age, bloodType} = req.body
  
  let newPatient = await patientModel.create({patientName, age, bloodType});
  res.send(newPatient)
  };

  async function getAllPatientsHandler(req, res) {
    const numPatients = 30;
    const patientCount = await patientModel.countDocuments();
    if (patientCount < numPatients) {
      for (let i = 0; i < numPatients - patientCount; i++) {
        const fakePatientData = {
          patientName: faker.name.fullName(),
          age: faker.datatype.number({ min: 18, max: 100 }),
          bloodType: faker.helpers.arrayElement(['A+', 'B+', 'AB+', 'O+', 'A-', 'B-', 'AB-', 'O-'])
        };
        await patientModel.create(fakePatientData);
      }
    }
    const patients = await patientModel.find();
    res.send(patients);
  }
  
  
  
  


  module.exports = {addPatientHandler, getAllPatientsHandler};