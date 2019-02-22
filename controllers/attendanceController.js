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
        // let attendRecords = []
        // for(let i=0;i<data.students.length;i++){
        //     db.attendRecord.create(data.students[i])
        //     .then(result =>{
        //         console.log("new record is "+result)
        //         attendRecords.push(result)
        //         if(i===data.students.length-1){
        //             db.attendance.create({
        //                 course:data.course,
        //                 date:data.date,
        //                 students:attendRecords
        //             })
        //             .then(result=>{
        //                 console.log(`congrats on adding a record!: ${result}`)
        //             })
        //             .catch(error=>{
        //                 console.log(`you tried adding an attendance object, but it's invalid: ${error}`)
        //             })
        //         }
        //     })
        //     .catch(error=>{
        //         console.log(error)
        //     })
        // }
        db.attendance.create(data)
        .then(result=>{
            console.log(`congrats on adding an attendance object!: ${result}`)
            let course =data.course;
            console.log("course to update is "+course)
            db.course.findByIdAndUpdate(course,{$addToSet:{"attendanceRecords":result}})
            .then(result=>{
                console.log("result of attendance in course is "+result)
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
