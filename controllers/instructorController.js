const db = require("../models/index");
const courseFuncs = require('./courseController');

module.exports = {
    add:function(req,res){
        console.log('inside controller' +JSON.stringify(req.body))
        db.instructor.create(req.body)
        .then(result=>{
            if(result._id){
                db.instructor.findById(result._id)
                .lean()
                .populate('currentlyTeaching', 'name _id')
                .then((instructor)=>{

                    instructor.currentlyTeaching.forEach((element,i) => {
                        courseFuncs.addToRoster(element,'instructors',instructor._id,(response)=>{
                            console.log('response for this add to course is: '+ response)
                        })
                    });
                    res.send({success:'Instructor Added', new:instructor})
                })

            }else{
                res.send({error:"Error"})
            }
        })
        .catch(error=>{
            res.send({error:error})
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
    getAll:function(userId,res){
        db.instructor.find({user:userId})
        .populate('currentlyTeaching')
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
    getOne:function(id,res){
        db.instructor.findById(id)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
    delete:function(userId,courseId,res){
        db.instructor.remove({_id:courseId})
        .then(result=>{

            db.instructor.find({user:userId})
            .populate('currentlyTeaching')
            .then(result=>{
                res.send({success:result})
            })
        })    
    },
    update:function(filter,update,res){
        db.instructor.findOneAndUpdate(filter,update)
        .then(result=>console.log(result))
    }
};
