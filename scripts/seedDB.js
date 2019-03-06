const mongoose = require("mongoose");
const db = require("../models");

// This file empties the students/instructors/and courses collection and inserts the seeds below

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/courseCreator",{ useNewUrlParser: true });

const studentSeed = [
  {
    firstName:"Tony",
    lastName:"Rodriguez",
    email:"tonyR@gmail.com",
    currentlyEnrolled:[],
    pastCourses:[],
    phone:"+19732233733"
  },
  {
    firstName:"David",
    lastName:"Troboli",
    email:"David.t@yahoo.com",
    currentlyEnrolled:[],
    pastCourses:[],
    phone:"+19732233733"
  },
  {
    firstName:"Sally",
    lastName:"Forester",
    email:"Forester.sally@aol.com",
    currentlyEnrolled:[],
    pastCourses:[],
    phone:"+19732233733"
  },      
];

const instructorSeed = [
  {
    firstName:"Samuel",
    lastName:"Motter",
    email:"mottersays@gmail.com",
    currentlyTeaching:[],
    pastCourses:[],
    phone:"+19732233733"
  },
  {
    firstName:"Sharon",
    lastName:"Elrich",
    email:"erlich.sharon@yahoo.com",
    currentlyTeaching:[],
    pastCourses:[],
    phone:"+19732233733"
  },
  {
    firstName:"Yasmin",
    lastName:"Montes",
    email:"Yas.mon@aol.com",
    currentlyTeaching:[],
    pastCourses:[],
    phone:"+19732233733"
  },
];

const courseSeed=[
  {
  name:"Basket Weaving",
  numberOfSeats:15,
  startDate:"3-04-2019",
  endDate:"3-08-2019",
  startTime:"6:30PM",
  endTime:"8:30PM",
  location:"134 sip ave. Jersey City NJ, 07109",
  instructors:[],
  students:[],
  attendanceRecords:[]
  },
  {
    name:"Personal Finance",
    numberOfSeats:10,
    startDate:"1-14-2019",
    endDate:"6-30-2019",
    startTime:"7:30PM",
    endTime:"9:30PM",
    location:"145 Prospect ave. Newark NJ, 07101",
    instructors:[],
    students:[],
    attendanceRecords:[]
  },
  {
    name:"Intro To Python",
    numberOfSeats:50,
    startDate:"2-14-2019",
    endDate:"8-14-2019",
    startTime:"8:30PM",
    endTime:"10:30PM",
    location:"15 Mercer Dr. Rosewood PA, 19010",
    instructors:[],
    students:[],
    attendanceRecords:[]
  }
]

const userSeed=
[
  {
    firstName:"Billy",
    lastName:"Fyre",
    email:"awfulPerson@gmail.com",
    userName:"user1",
    password:"user1"
    }
];

insertStudents=()=>{
  db.student
    .remove({})
    .then(() => db.student.collection.insertMany(studentSeed))
    .then(data => {
      insertInstructors();
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
    insertCourses();
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
    insertUsers();
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
}

insertUsers=()=>{
  db.user
  .remove({})
  .then(() => db.user.collection.insertMany(userSeed))
  .then(data => {
    console.log('Seeds Inserted!')
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
}

insertStudents();
