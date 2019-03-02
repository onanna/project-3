const router = require("express").Router();
const course = require("../../controllers/courseController");

//matches with "/api/courses" 
router.route("/")
    .get(course.getAll)
    .post(course.new)

// router.route("/api/courses")
//     .get(course.getAll)
//     .post(course.new)

router.route("/:courseId")
    .delete((req,res)=>{
        course.delete(req.params.courseId)
        .then((response)=>res.json(response))
        .catch(res=>console.log(res))
        // console.log("heres the response" + res)
    })
    .put((req)=>{
        let {whatToChange,newValue}=req.body
        let update={[whatToChange]:newValue}
        course.update(req.params.courseId,update)
    });

router.route("/:courseId/:roster")
    .post((data)=>{
        switch(data.params.roster){
            case "students": 
                course.addToRoster(data.params.courseId,"students",data.body)
            break;

            case "instructors":
                course.addToRoster(data.params.courseId,"instructors",data.body)
            break;
        }
    })
    .put((data)=>{
          switch(data.params.roster){
            case "students":
                // console.log("data.params.courseId="+data.params.courseId)
                // console.log("data.body="+JSON.stringify(data.body))
                course.removeFromRoster(data.params.courseId,'students',data.body);
            break;

            case "instructors":
                course.removeFromRoster(data.params.courseId,'instructors',data.body);                
            break;
        }
    });

module.exports=router;