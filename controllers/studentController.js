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
            .catch(err => res.status(422).json(err));
            
        })

    },
    getAll:function(req,res){

        db.student.find(req.query)
        // .sort({ date: -1 })
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    }
};
