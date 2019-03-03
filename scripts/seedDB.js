const mongoose = require("mongoose");
const db = require("../models");

// This file empties the students/instructors/and courses collection and inserts the seeds below

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/courseCreator",{ useNewUrlParser: true });

const studentSeed = [
  {
    firstName:"Tony",
    lastName:"See",
    email:"someemail@gmail.com",
    currentlyEnrolled:[],
    pastCourses:[],
    phone:"+19732233733"
  },
  {
    firstName:"David",
    lastName:"jack",
    email:"someOtheremail@yahoo.com",
    currentlyEnrolled:[],
    pastCourses:[],
    phone:"+1someRandomNumber"
  },
  {
    firstName:"Sallie",
    lastName:"Mae",
    email:"notbroke@aol.com",
    currentlyEnrolled:[],
    pastCourses:[],
    phone:"+1someRandomNumber"
  },      
];

const instructorSeed = [
  {
    firstName:"First",
    lastName:"Instructor",
    email:"something@gmail.com",
    currentlyTeaching:[],
    pastCourses:[],
    phone:"+1someRandomNumber"
  },
  {
    firstName:"numbah",
    lastName:"two",
    email:"someOtherthing@yahoo.com",
    currentlyTeaching:[],
    pastCourses:[],
    phone:"+19732233733"
  },
  {
    firstName:"Noel",
    lastName:"Holiday",
    email:"nice@aol.com",
    currentlyTeaching:[],
    pastCourses:[],
    phone:"+1someRandomNumber"
  },
];

const courseSeed=[
  {
  name:"Biology",
  numberOfSeats:5,
  startDate:"3-04-2019",
  endDate:"3-08-2019",
  startTime:"06:30PM",
  endTime:"08:30PM",
  location:"134 sip ave. Jersey City NJ, 07109",
  instructors:[],
  students:[],
  attendanceRecords:[]
  },
  {
    name:"Math",
    numberOfSeats:7,
    startDate:"1-14-2019",
    endDate:"2-30-2019",
    startTime:"07:30PM",
    endTime:"09:30PM",
    location:"145 sip ave. Jersey City NJ, 07109",
    instructors:[],
    students:[],
    attendanceRecords:[]
  },
  {
    name:"History",
    numberOfSeats:97,
    startDate:"2-14-2019",
    endDate:"8-14-2019",
    startTime:"08:30PM",
    endTime:"10:30PM",
    location:"15 taco st. Jersey City NJ, 07109",
    instructors:[],
    students:[],
    attendanceRecords:[]
  }
]

const userSeed=
[
  {
    firstName:"first",
    lastName:"last",
    email:"1as@gmail.com",
    userName:"user1",
    password:"test1"
  },
  {
    firstName:"yuiy",
    lastName:"asdf",
    email:"fdf@yahoo.com",
    userName:"user2",
    password:"test2"
  },
  {
    firstName:"sssss",
    lastName:"fffd",
    email:"afsdf@aol.com",
    userName:"user3",
    password:"test3"
  },
];
// insertStudents=()=>{
//   db.student
//     .remove({})
//     .then(() => db.student.collection.insertMany(studentSeed))
//     .then(data => {
//       console.log(data.result.n + " students inserted!");
//       process.exit(0);
//     })
//     .catch(err => {
//       console.error(err);
//       process.exit(1);
//     });
// }

// insertInstructors=()=>{
//   db.instructor
//   .remove({})
//   .then(() => db.instructor.collection.insertMany(instructorSeed))
//   .then(data => {
//     console.log(data.result.n + " instructors inserted!");
//     process.exit(0);
//   })
//   .catch(err => {
//     console.error(err);
//     process.exit(1);
//   });
// }

// insertCourses=()=>{
//   db.course
//   .remove({})
//   .then(() => db.course.collection.insertMany(courseSeed))
//   .then(data => {
//     console.log(data.result.n + " courses inserted!");
//     process.exit(0);
//   })
//   .catch(err => {
//     console.error(err);
//     process.exit(1);
//   });
// }

// insertUsers=()=>{
//   db.user
//   .remove({})
//   .then(() => db.user.collection.insertMany(userSeed))
//   .then(data => {
//     console.log(data.result.n + " users inserted!");
//     process.exit(0);
//   })
//   .catch(err => {
//     console.error(err);
//     process.exit(1);
//   });
// }

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
    console.log("users, courses, instructors, & students inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
}

// insertCourses();
insertStudents();
// insertInstructors();
// insertUsers();

// insertSeeds();

  // insertSeeds=()=>{
  //   db.student.remove({})
  //   .then(
  //     db.student.collection.insertMany(courseSeed)
  //   )
  
  //   db.instructor.remove({})
  //   .then(
  //     db.instructor.collection.insertMany(instructorSeed)
  //   )
  
  //   db.course.remove({})
  //   .then(
  //     db.course.collection.insertMany(courseSeed)
  //   )
  //     // .then(() => {
  //     //   console.log("supposedly all collections have been removed")
  //     //   db.student.collection.insertMany(studentSeed)
  //     // }) 
  //     // .then(()=>{
  //     //   db.instructor.collection.insertMany(instructorSeed)
  //     // })
  //     // .then(()=>{
  //     //   db.course.collection.insertMany(courseSeed)
  //     // })
  //     // .catch(err => {
  //     //   console.error(err);
  //     //   process.exit(1);
  //     // });
  // }