const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const student = require("./student")
const instructor = require("./instructor")


const courseSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: "user",
        required:true
    },
    name:{
        type:String,
        required:true,
        trim:true,
    }, 
    numberOfSeats:{
        type:Number,
        required:true,
        trim:true
    },    
    startDate:{
        type:String,
        required:true,
        trim:true
    },
    endDate:{
        type:String,
        required:true,
        trim:true
    },
    startTime:{
        type:String,
        trim:true
    },
    endTime:{
        type:String,
        trim:true
    },
    location:{
        type:String,
        trim:true
        //going to be the full address. Formatting can be done front-end
    },
    instructors: [
        {
            type: Schema.Types.ObjectId,
            ref: "instructor",
            required:true
        }
    ],
    students: [
        {
            type: Schema.Types.ObjectId,
            ref: "student",
            required:true,
            maxlength:this.numberOfSeats
        }
    ],
    attendanceRecords:[
        { 
            type: Schema.Types.ObjectId, 
            ref: "attendance",
            required:true,
        }
    ]

    
},{collection:"courses"})

const course = mongoose.model("course", courseSchema);
module.exports = course;