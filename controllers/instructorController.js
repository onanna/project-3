const db = require("../models/index");

module.exports = {
    add:function(req){

        db.instructor.create(req.body)
        .then(result=>{
            console.log(`congrats on adding an instructor!: ${result}`)
        })
        .catch(error=>{
            console.log(`you tried adding an instructor, but it's invalid: ${error}`)
        })
     
    },
    getAll:function(req,res){
        db.instructor.find(req.query)
        // .sort({ date: -1 })
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
    delete:function(idToDelete){
        db.instructor.remove({_id:idToDelete})
        .then(result=>{console.log("instructor deleted! "+result)})
    },
    update:function(filter,update,res){
        console.log(filter,update)
        db.instructor.findOneAndUpdate(filter,update)
        .then(result=>console.log(result))
        // .then(this.getAll(""))

    }
};
