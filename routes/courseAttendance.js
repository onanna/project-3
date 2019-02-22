const router = require("express").Router();
let attendance = require("../controllers/attendanceController")

//matches with "/course-attendance" 
router.route("/")
    .get()
    .post((data)=>{
        console.log("welcome to POST /course-attendance")
        console.log(data)
    });

router.route("/:courseId")
    .post((req,res)=>{
        console.log(req.params.courseId)
        console.log(req.body)
        // res.json(req.body)

        attendance.new(req.body)
        //go through roster and check if each student is in attendanceArray
        //set var to false
        //if they are in array, set var to true


    })
    .delete((req,res)=>{
        
    })
    .put((req,res)=>{
        
      })

module.exports=router;