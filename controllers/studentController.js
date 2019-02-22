const db = require("../models/index");

module.exports = {
    add:function(req,res){
       
        db.student.create(req.body)
        .then(result=>{
            console.log(`congrats on adding a student!: ${result}`)
            res.json(result);
        })
        .catch(error=>{
            console.log(`you tried adding a student, but it's invalid: ${error}`)
        })

    },
    getAll:function(req,res){

        db.student.find(req.query)
        // .sort({ date: -1 })
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
    delete:function(idToDelete){
        db.student.remove({_id:idToDelete})
        .then(result=>{console.log("student deleted! "+result)})
    },
    update:function(filter,update,res){
        console.log(filter,update)
        db.student.findOneAndUpdate(filter,update)
        .then(result=>console.log(result))
        // .then(this.getAll(""))

    }
};
