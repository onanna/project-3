const router = require("express").Router();
const course = require("../../controllers/courseController");

//matches with "/api/courses" 
router.get("/",(req,res)=>{
    console.log("welcome ot /api/courses GET!")
})

router.post("/",(req,res)=>{
    console.log("welcome to /api/courses POSTTT")
})
    
module.exports=router;