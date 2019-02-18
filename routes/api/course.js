const router = require("express").Router();
const course = require("../../controllers/courseController");

//matches with "/api/courses" 
router.route("/")
    .get(course.getAll)
    //.post(course.new)


router.route("/:courseId")
    .post((data)=>{
        let {collection,dataToAdd,courseId}=data
        course.add(collection,dataToAdd,courseId)
    })
    .delete((data)=>{
        //course.delete
    })
    .put((data)=>{
        // course.update
    });

router.route("/:courseId/:roster")
    .post((data)=>{
        switch(data.params.roster){
            case "students": course.addStudents()
            break;

            case "instructors":course.addInstructors()
            break;

            default:
            break
        }
    })
    .put((data)=>{
          switch(data.params.roster){
            case "students":
                course.removeStudents();
            break;

            case "instructors":course.removeInstructors();
            break;

            default:
            break
        }
    });




    
module.exports=router;