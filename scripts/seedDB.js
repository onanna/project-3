const mongoose = require("mongoose");
const db = require("../models");

// This file empties the students/instructors/and courses collection and inserts the seeds below

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/courseCreator",{ useNewUrlParser: true });

const studentSeed = [
  {
    firstName:"Tony",
    lastName:"See",
    userName:"veryFirst",
    email:"someemail@gmail.com",
    password:"nope"
  },
  {
    firstName:"David",
    lastName:"jack",
    userName:"secondUser",
    email:"someOtheremail@yahoo.com",
    password:"hello"
  },
  {
    firstName:"Sallie",
    lastName:"Mae",
    userName:"highlyInterested",
    email:"notbroke@aol.com",
    password:"tester"
  },      
];

const instructorSeed = [
  {
    firstName:"First",
    lastName:"Instructor",
    userName:"veryFirst",
    email:"something@gmail.com",
    password:"nope"
  },
  {
    firstName:"numbah",
    lastName:"two",
    userName:"secondUser",
    email:"someOtherthing@yahoo.com",
    password:"hello"
  },
  {
    firstName:"Noel",
    lastName:"Holiday",
    userName:"HappyGuy",
    email:"nice@aol.com",
    password:"tester"
  },
];

insertStudents=()=>{
  db.student
    .remove({})
    .then(() => db.student.collection.insertMany(studentSeed))
    .then(data => {
    console.log(data)
      console.log(data.result.n + " records inserted!");
      process.exit(0);
    })
    .catch(err => {
      console.error(err);
      process.exit(1);
    });
}

insertInstructors=()=>{
  db.instructor
  .remove({})
  .then(() => db.instructor.collection.insertMany(instructorSeed))
  .then(data => {
    console.log(data)
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
}

insertStudents();
insertInstructors();