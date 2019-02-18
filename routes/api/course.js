const router = require("express").Router();
const course = require("../../controllers/courseController");

//matches with "/api/courses" 
router.route("/")
    .get(course.getAll)

router.route("/:courseId")
    .post((data)=>{
        let {collection,dataToAdd,courseId}=data
        course.add(collection,dataToAdd,courseId)
    })
    .delete((data)=>{
        let {collection,whatToRemove,courseId}=data
        course.remove(collection,whatToRemove,courseId)
    });


    
module.exports=router;