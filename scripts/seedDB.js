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

const courseSeed=[
  {
    name:"History",
    startDate:new Date(),
    endDate:new Date(),
    startTime:"08:30PM",
    endTime:"10:30PM",
    location:"15 taco st. Jersey City NJ, 07109",
    instructors:[],
    students:[]
  },
  {
  name:"Biology",
  startDate:new Date(),
  endDate:new Date(),
  startTime:"06:30PM",
  endTime:"08:30PM",
  location:"134 sip ave. Jersey City NJ, 07109",
  instructors:[],
  students:[]
  },
  {
    name:"Math",
    startDate:new Date(),
    endDate:new Date(),
    startTime:"07:30PM",
    endTime:"09:30PM",
    location:"145 sip ave. Jersey City NJ, 07109",
    instructors:[],
    students:[]
  },
  {
    name:"History",
    startDate:new Date(),
    endDate:new Date(),
    startTime:"08:30PM",
    endTime:"10:30PM",
    location:"15 taco st. Jersey City NJ, 07109",
    instructors:[],
    students:[]
  }
]

insertStudents=()=>{
  db.student
    .remove({})
    .then(() => db.student.collection.insertMany(studentSeed))
    .then(data => {
    console.log(data)
      console.log(data.result.n + " students inserted!");
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
    console.log(data.result.n + " instructors inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
}

insertCourses=()=>{
  db.course
  .remove({})
  .then(() => db.course.collection.insertMany(courseSeed))
  .then(data => {
    console.log(data)
    console.log(data.result.n + " courses inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
}

// insertStudents();
// insertInstructors();
insertCourses();