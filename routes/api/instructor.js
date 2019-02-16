const router = require("express").Router();
const instructor = require("../../controllers/instructorController");

//matches with "/api/instructors" 
router.route("/")
    .get(instructor.getAll);



module.exports=router;