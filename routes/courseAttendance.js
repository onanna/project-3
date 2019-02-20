const router = require("express").Router();

//matches with "/course-attendance" 
router.route("/")
    .get()
    .post((data)=>{
        console.log("welcome to POST /course-attendance")
        console.log(data)
    });

router.route("/:courseId")
    .post((req,res)=>{
        console.log(req.params.courseId)
        console.log(req.body)
        res.json(req.body)
    })
    .delete((req,res)=>{
        
    })
    .put((req,res)=>{
        
      })

module.exports=router;