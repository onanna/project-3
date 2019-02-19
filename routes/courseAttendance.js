const router = require("express").Router();

//matches with "/course-attendance" 
router.route("/")
    .get()
    .post((data)=>{
        console.log("welcome to POST /course-attendance")
        console.log(data)
    });

router.route("/:id")
    .post((req,res)=>{
        // console.log(req.params.id)
        return (req.body)
    })
    .delete((req,res)=>{
        
    })
    .put((req,res)=>{
        
      })

module.exports=router;