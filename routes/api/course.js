const router = require("express").Router();
const course = require("../../controllers/courseController");

//matches with "/api/courses" 
router.route("/")
    .get(course.getAll)


    
module.exports=router;