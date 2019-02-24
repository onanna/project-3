const db = require("../models/index");

function getDifferences(unfiltered,filtered){
    var differences = unfiltered.filter((current) => !filtered.includes(current));
    return(differences);
}
function adjustStudentRosters(studentsToFix,operation,course){
    switch(operation){
        case "add":
            //add this course ID to each student's currentlyEnrolled array
            studentsToFix.forEach((current,i) => {
                db.student.findByIdAndUpdate(current,{$addToSet:{"currentlyEnrolled":course}},{new:true})
                .then(console.log(`student ${current._id} has had course ${course._id} added to currentlyEnrolled`))
                .catch(res=>console.log(res))
            });
        break;

        case "remove":
            studentsToFix.forEach((current,i) => {
                db.student.findByIdAndUpdate(current._id,{$pull:{"currentlyEnrolled":course._id}},{new:true})
                .then(console.log(`student ${current._id} has had course ${course._id} deleted from currentlyEnrolled`))
                .catch(res=>console.log(res))
            });
        break;
            
    }
}
function adjustInstructorRosters(instructorsToFix,operation,course){
    switch(operation){
        case "add":
            //add this course ID to each student's currentlyEnrolled array
            instructorsToFix.forEach((current,i) => {
                db.instructor.findByIdAndUpdate(current,{$addToSet:{"currentlyTeaching":course}},{new:true})
                .then(console.log(`instructor ${current._id} has had course ${course._id} added to currentlyTeaching`))
                .catch(res=>console.log(res))
            });
        break;

        case "remove":
            instructorsToFix.forEach((current,i) => {
                db.instructor.findByIdAndUpdate(current._id,{$pull:{"currentlyTeaching":course._id}},{new:true})
                .then(console.log(`instructor ${current._id} has had course ${course._id} deleted from currentlyTeaching`))
                .catch(res=>console.log(res))
            });
        break;
    }
}

// Defining methods for the courseController
module.exports = {
    new:function(req,res){
        console.log("about to add this to courses: "+JSON.stringify(req.body))
        db.course.create(req.body)
        .then(result=>{
            console.log(`congrats on adding a course!: ${result}`)
            res.json(result);
        })
        .catch(error=>{
            console.log(`you tried adding a course, but it's invalid: ${error}`)
        })
    },
    delete:function(courseId){
        return db.course.findByIdAndDelete(courseId)
    },
    update:function(courseId,update){
        db.course.findByIdAndUpdate(courseId,update)
        .then(res=>console.log(res))
        .catch(res=>console.log(res))
    },
    getAll:function(req,res){
        db.course.find(req.query)
        // .sort({ : -1 })
        .populate('students')
        .then(data => res.json(data))
        .catch(err => res.status(422).json(err));
    },
    addToRoster:function(courseId,roster,dataToAdd){
        if(roster&&courseId){
            db.course.findByIdAndUpdate(courseId,{$addToSet:{[roster]:dataToAdd}},{new:true})
            .then(updatedCourse=>{
                let added;
                switch(roster){
                    case "students":
                        added=updatedCourse.students
                        adjustStudentRosters(added,"add",updatedCourse)        
                    break;

                    case "instructors":
                        added=updatedCourse.instructors
                        adjustInstructorRosters(added,"add",updatedCourse)        
                    break;
                }
            })
            .catch(res=>console.log(res))
        }
    },
    removeFromRoster:function(courseId,roster,whatToRemove){
    
        if(courseId&&whatToRemove&&roster){
            db.course.findByIdAndUpdate(courseId,{$pull:{[roster]:{$in:whatToRemove}}},{new:true})            
            .then(updatedCourse=>{
                let deleted;
                switch(roster){
                    case "students":
                        deleted=getDifferences(whatToRemove,updatedCourse.students)
                        adjustStudentRosters(deleted,"remove",updatedCourse)
                    break;

                    case "instructors":
                        deleted=getDifferences(whatToRemove,updatedCourse.instructors)
                        adjustInstructorRosters(deleted,"remove",updatedCourse)        
                    break;
                }
                
            })
            .catch(res=>console.log(res))
        }
    }
}