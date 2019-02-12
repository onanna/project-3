const db = require("../models/index");

module.exports = {
    add:function(req,res){

        db.instructor.create(req.body)
        .then(result=>{
            console.log(`congrats on adding an inst!: ${result}`)
            res.json(result);
        })
        .catch(error=>{
            console.log(`you tried adding a user, but it's invalid: ${error}`)
        })
     
    }
};
