const db = require("../models/index");
const courseFuncs = require('./courseController')

module.exports = {
    add:function(req,res){
        console.log('inside controller' +JSON.stringify(req.body))
        db.student.create(req.body)
        .then(result=>{
            if(result._id){
                //since there is no way to populate a subdocument after "create" query, we need to run a "find" query and populate there
                db.student.findById(result._id)
                .lean()
                .populate('currentlyEnrolled', 'name _id')
                .then((student)=>{
                    student.currentlyEnrolled.forEach((element,i) => {
                        courseFuncs.addToRoster(element,'students',student._id,(response)=>{
                            console.log('response for this add to course is: '+ response)
                        })
                    });
                    res.send({success:'Student Added', new:student})
                })
                
            }else{
                res.send({error:"Error"})
            }
        })
        .catch(error=>{
            res.send({error:error})
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
    getAll:function(userId,res){
        db.student.find({user:userId})
        .populate('currentlyEnrolled')
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
    delete:function(userId,courseId,res){
        db.student.remove({_id:courseId})
        .then(result=>{

            db.student.find({user:userId})
            .populate('currentlyEnrolled')
            .then(result=>{
                res.send({success:result})
            })
        })    
    },
    update:function(filter,update,res){
        db.student.findOneAndUpdate(filter,update)
        .then(result=>console.log(result))
    }
};
