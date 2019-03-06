const db = require("../models/index");
const courseFuncs = require('./courseController');

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
    makeAndAdd:function(newIns,course,res){
        db.instructor.create(newIns)
            .then(result=>{
                if(result._id){
                    courseFuncs.addToRoster(course,'instructors',result._id,res)
                }else{
                    res.send({error:'could not create instructor'})
                }
            })
            .catch(error=>{
                if(error.errmsg.includes('email_1 dup key')){
                    res.send({error:'An Instructor with that email already exists'})
                }else{
                    res.send({error:error})
                }
            })
    },
    getAll:function(req,res){
        db.instructor.find(req.query)
        // .sort({ date: -1 })
        .populate('currentlyTeaching')
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
    getOne:function(id,res){
        db.instructor.findById(id)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
    delete:function(idToDelete){
        db.instructor.remove({_id:idToDelete})
        .then(result=>{console.log("instructor deleted! "+result)})
    },
    update:function(filter,update,res){
        db.instructor.findOneAndUpdate(filter,update)
        .then(result=>console.log(result))
    }
};
