const router = require("express").Router();
const course = require("../../controllers/courseController");

//matches with "/api/courses" 
router.route("/")
    .get(course.getAll)
    .post(course.new)

router.route("/:courseId")
    // .get((id)=>{
    //     console.log("id to get is "+id)
    // })
    .delete((req)=>course.delete(req.params.courseId))
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