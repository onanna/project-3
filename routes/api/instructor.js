const router = require("express").Router();
const instructor = require("../../controllers/instructorController");

//matches with "/api/instructors" 
router.route("/")
    .get(instructor.getAll)
    .post((data)=>instructor.add(data));

router.route("/:id")
    .delete((req,res)=>{
        instructor.delete({"_id":req.params.id})
    })
    .put((req,res)=>{
        let {newValue,whatToChange} = req.body[0]
    
        let filter={_id:req.params.id}
        let update={[whatToChange]:newValue}
        
        instructor.update(filter,update);
      })



module.exports=router;