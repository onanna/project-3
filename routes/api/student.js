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
  .put((req,res)=>{
    // let newValue = req.body[0].newValue
    // let whatToChange =req.body[0].whatToChange
    let {newValue,whatToChange} = req.body[0]
    // console.log(newValue , whatToChange)

    let filter={_id:req.params.id}
    let update={[whatToChange]:newValue}
    // console.log(eval(whatToChange))
    
    // switch(whatToChange){
    //   case "firstName":
    //   case "lastName":
    // }

    student.update(filter,update);

    // student.update({_id:req.params.id},{})
  })

module.exports=router;