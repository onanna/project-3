const db = require("../models/index");
const courseFuncs = require('./courseController')

module.exports = {
    add:function(req,res){
        db.student.create(req.body)
        .then(result=>{
            res.json(result);
        })
        .catch(error=>{
            console.log(`you tried adding a student, but it's invalid: ${error}`)
        })

    },
    makeAndAdd:function(newStu,course,res){
        db.student.create(newStu)
            .then(result=>{
                if(result._id){
                    courseFuncs.addToRoster(course,'students',result._id,res)
                }else{
                    res.send({error:'could not create student'})
                }
            })
            .catch(error=>{
                if(error.errmsg.includes('email_1 dup key')){
                    res.send({error:'A Student with that email already exists'})
                }else{
                    res.send({error:error})
                }
            })
    },
    getOne:function(id,res){
        db.student.findById(id)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
    getAll:function(req,res){

        db.student.find(req.query)
        // .sort({ date: -1 })
        .populate('currentlyEnrolled')
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
    delete:function(idToDelete){
        db.student.remove({_id:idToDelete})
        .then(result=>{console.log("student deleted! "+result)})
    },
    update:function(filter,update,res){
        db.student.findOneAndUpdate(filter,update)
        .then(result=>console.log(result))
    }
};
