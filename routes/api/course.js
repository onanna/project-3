const router = require("express").Router();
const course = require("../../controllers/courseController");

//matches with "/api/courses" 
router.route("/")
    .get(course.getAll)
    .post(course.new)

router.route("/:courseId")
    .delete((req,res)=>{
        course.delete(req.params.courseId)
        .then((response)=>res.json(response))
        .catch(res=>console.log(res))
    })
    .put((req)=>{
        let {whatToChange,newValue}=req.body
        let update={[whatToChange]:newValue}
        course.update(req.params.courseId,update)
    })
    .get((req,res)=>{
        course.getOne(req.params.courseId,res)
    })

router.route("/:courseId/:roster")
    .post((data,res)=>{
        switch(data.params.roster){
            case "students": 
                course.addToRoster(data.params.courseId,"students",data.body,res)
            break;

            case "instructors":
                course.addToRoster(data.params.courseId,"instructors",data.body,res)
            break;
        }
    })
    .put((data)=>{
          switch(data.params.roster){
            case "students":
                course.removeFromRoster(data.params.courseId,'students',data.body);
            break;

            case "instructors":
                course.removeFromRoster(data.params.courseId,'instructors',data.body);                
            break;
        }
    });

module.exports=router;