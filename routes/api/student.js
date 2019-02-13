const router = require("express").Router();
const student = require("../../controllers/studentController");

//matches with "/api/students" 
// router.get("/",(req,res)=>{
//     console.log("welcome to /api/students GET!")
//     return student.getAll() ;
// })

router.route("/")
  .get(student.getAll)

module.exports=router;