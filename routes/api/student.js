const router = require("express").Router();
const student = require("../../controllers/studentController");

//matches with "/api/students" 
router.route("/")
  .get(student.getAll)
  .post((req,res)=>{
    student.add(req,res)
  })

router.route('/user/:id')
  .get((req,res)=>{
      console.log('getting students that belong only to '+req.params.id)
      student.getAll(req.params.id,res)
  })

router.route('/new-add/:courseId')
  .post((req,res)=>{
      let course =req.params.courseId;
      let newStu = req.body

      student.makeAndAdd(newStu,course,res)
      // res.send({newStu:newStu, course: course})
  })

// matches with '/api/students/:id'
router.route("/:id")
  .get((req,res)=>{
    student.getOne(req.params.id,res)
  })
  .delete((req,res)=>{
    student.delete({"_id":req.params.id})
  })
  .put((req,res)=>{
    let {newValue,whatToChange} = req.body[0]
    //need to validate
    let filter={_id:req.params.id}
    let update={[whatToChange]:newValue}
    
    // switch(whatToChange){
    //   case "firstName":
    //   case "lastName":
    // }
    student.update(filter,update);
  })

module.exports=router;