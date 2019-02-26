const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const student = require("./student")
const instructor = require("./instructor")


const courseSchema = new Schema({
    course:{
        type:String,
        required:true,
        trim:true,
        unique:true
    }, 
    numberOfSeats:{
        type:Number,
        required:true,
        trim:true
    },    
    startDate:{
        type:Date,
        required:true,
        trim:true
    },
    endDate:{
        type:Date,
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
            required:true,
            // unique:true
        }
    ],
    students: [
        { 
            type: Schema.Types.ObjectId, 
            ref: "student",
            required:true,
            maxlength:this.numberOfSeats
            // unique:true
        }
    ]
    
},{collection:"courses"})

const course = mongoose.model("course", courseSchema);
module.exports = course;