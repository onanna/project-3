const router = require("express").Router();
let attendance = require("../controllers/attendanceController")
const accountSid = 'AC5f8b93503a7b2bbff25860abb4ecbb34';
const authToken = 'cbbdf16e9181d3482bc3a389b7b7c169';
const client = require('twilio')(accountSid, authToken);

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

router.route("/send/:courseId")
    .post((req,res)=>{
        console.log("inside sms test route!")
        client.messages
        .create({
            body: 'testing the sms send feature',
            from: '+18622175206',
            to: '+19732233733'
        })
        .then(message => console.log(message.sid));
    })

module.exports=router;