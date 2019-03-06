const router = require("express").Router();
const user = require("../controllers/userController");

//matches with "/user" 
router.route("/")
    .post((req,res)=>{
        user.add(req.body,res)
    });

router.route("/:id")
    .get((req,res)=>{
        user.getOne(req.params.id,res)
    })
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