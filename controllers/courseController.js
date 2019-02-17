const db = require("../models/index");

// Defining methods for the courseController
module.exports = {
    add:function(req,res){

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
    addStu:function(studentsToAdd,courseId){
        console.log(courseId)

        
        db.course.
            findOne({_id:courseId},(err,course)=>{
                if(err) throw err;
                console.log("entered the addStu findOne bracket. studentIds length= "+studentsToAdd.length)
                studentsToAdd.forEach(current => {
                    course.students.push(current._id)
                });
                course.save();
            })       
       

    }


    // addCourse:function(req,res){
    //     db.user.create(req.body)
    //     .then(result=>{
    //         console.log(`congrats!: ${result}`)
    //         res.json(result);
    //     })
    //     .catch(error=>{
    //         console.log(`you tried adding a user, but it's invalid: ${error}`)
    //     })
    // }
}