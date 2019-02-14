const router = require("express").Router();
const instructor = require("../../controllers/instructorController");

//matches with "/api/instructors" 
router.route("/")
    .get(instructor.getAll);

router.route("/:id")
    .delete((req,res)=>{
        instructor.delete({"_id":req.params.id})
    })



module.exports=router;