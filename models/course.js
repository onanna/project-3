const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    name:{
        type:String,
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
    instructor:{
        type: String,
        trim: true
        //going to be like library exercise where we reference one book from another collection
    }
    //, roster:{
    //     students:[],
    // }
    
},{collection:"courses"})

const course = mongoose.model("course", courseSchema);
module.exports = course;