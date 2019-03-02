const router = require("express").Router();
const user = require("../controllers/userController");

//matches with "/user" 
router.route("/")
    .get(user.getAll)
    .post((data)=>{
        console.log("data passed to backend is "+ JSON.stringify(data.body))
        user.add(data.body)
    });

router.route("/:id")
    .delete((req,res)=>{
        user.delete({"_id":req.params.id})
    })
    .put((req,res)=>{
        let {newValue,whatToChange} = req.body[0]
    
        let filter={_id:req.params.id}
        let update={[whatToChange]:newValue}
        
        user.update(filter,update);
      })



module.exports=router;