const db = require("../models/index");

module.exports = {
    add:function(req){

        db.user.create(req.body)
        .then(result=>{
            console.log(`congrats on adding an user!: ${result}`)
        })
        .catch(error=>{
            console.log(`you tried adding an user, but it's invalid: ${error}`)
        })
     
    },
    new:function(data){
        db.attendance.create(data)
        .then(result=>{
            console.log(`congrats on adding an attendance object!: ${result}`)
            // let course ="5c7082b2e813cc4290ec8e4b";
            let course="data._id"
            console.log("course to update is "+course)
            // db.course.findByIdAndUpdate(course,{$addToSet:{"attendanceRecords":result}})
            db.course.findByIdAndUpdate(course,{$addToSet:{"attendanceRecords":result._id}})
            .then(result=>{
                console.log("result of attendance in course is "+result)
            })
            .catch(error=>{
                console.log(`you tried adding an attendance object to a course, but it's invalid: ${error}`)
            })
        })
        .catch(error=>{
            console.log(`you tried adding an attendance object, but it's invalid: ${error}`)
        })
    },
    getAll:function(req,res){
        db.user.find(req.query)
        // .sort({ date: -1 })
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
    delete:function(idToDelete){
        db.user.remove({_id:idToDelete})
        .then(result=>{console.log("user deleted! "+result)})
    },
    update:function(filter,update,res){
        console.log(filter,update)
        db.user.findOneAndUpdate(filter,update)
        .then(result=>console.log(result))
        // .then(this.getAll(""))

    }
};
