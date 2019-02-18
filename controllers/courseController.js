const db = require("../models/index");

// Defining methods for the courseController
module.exports = {
    new:function(req,res){

        db.course.create(req.body)
        .then(result=>{
            console.log(`congrats on adding a course!: ${result}`)
            res.json(result);
        })
        .catch(error=>{
            console.log(`you tried adding a course, but it's invalid: ${error}`)
        })
    },
    getAll:function(req,res){
        db.course.find(req.query)
        // .sort({ date: -1 })
        .populate('students')
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
    add:function(collection,dataToAdd,courseId){
        console.log("ADDING TO COURSE", collection+dataToAdd+courseId)
        if(collection&&courseId){
            db.course.findByIdAndUpdate(courseId,{$addToSet:{[collection]:dataToAdd}})
            .then(res=>console.log(res))
            .catch(res=>console.log(res))
        }
    },
    remove:function(collection,whatToRemove,courseId){
        console.log("REMOVING FROM COURSE", courseId)
        if(collection&&courseId){
            db.course.findByIdAndUpdate(courseId,{$pull:{[collection]:whatToRemove}})
            .then(res=>console.log(res))
            .catch(res=>console.log(res))
        }
    }
}