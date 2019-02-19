const db = require("../models/index");

module.exports = {
    add:function(req){

        db.user.create(req.body)
        .then(result=>{
            console.log(`congrats on adding an user!: ${result}`)
        })
        .catch(error=>{
            console.log(`you tried adding an user, but it's invalid: ${error}`)
        })
     
    },
    getAll:function(req,res){
        db.user.find(req.query)
        // .sort({ date: -1 })
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
    delete:function(idToDelete){
        db.user.remove({_id:idToDelete})
        .then(result=>{console.log("user deleted! "+result)})
    },
    update:function(filter,update,res){
        console.log(filter,update)
        db.user.findOneAndUpdate(filter,update)
        .then(result=>console.log(result))
        // .then(this.getAll(""))

    }
};
