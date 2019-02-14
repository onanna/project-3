const router = require("express").Router();
const student = require("../../controllers/studentController");

//matches with "/api/students" 
router.route("/")
  .get(student.getAll)

// matches with '/api/students/:id'
router.route("/:id")
  .delete((req,res)=>{
    console.log(req.params.id)
    student.delete({"_id":req.params.id})
  })

module.exports=router;