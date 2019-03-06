const router = require("express").Router();
let attendance = require("../controllers/attendanceController")
require('dotenv').load();
const accountSid = process.env.Account;
const authToken = process.env.authToken;
const client = require('twilio')(accountSid, authToken);
const from = process.env.textNumber

//matches with "/course-attendance" 
router.route("/")
    .get()
    .post((data,res)=>{
        console.log("welcome to POST /course-attendance")
        console.log(data)
    });

// route for posting attendance
router.route("/:courseId")
    .get((req,res)=>{
        console.log('course to get attendance for in route is '+JSON.stringify(req.params))
        attendance.getAllFromCourse(req.params.courseId,res)
    })
    .post((req,res)=>{
        console.log(req.params.courseId)
        console.log(req.body)
        // res.json(req.body)

        attendance.new(req.body,res)

    })
    .delete((req,res)=>{
        
    })
    .put((req,res)=>{
        
    })


// route to send the text
//matches with "/course-attendance/send/:courseId"
router.route("/send/:courseId")
    .post((req,res)=>{
        console.log("inside sms test route!")
        // console.log("token is: "+req.params.token)
        console.log('token is '+authToken)
        console.log('account is is '+accountSid)
        let number = req.body.number
        let url = req.body.urlToSend
        let body = `Link for today's attendance: ${url}`
        
        console.log('number is '+ number)
        console.log('url is '+ url)
        console.log('body is '+ body) 
        console.log('from  is '+ from) 

        if(body && from && number){
            
            client.messages
                .create({
                    body: body,
                    from: from,
                    to: number
                })
                .then(message => {
                    if(message.sid){
                        res.send({success:'text successfully sent to '+number})
                    }
                })
                .catch(error=>res.send({error:error.message}))
        }
    })

module.exports=router;