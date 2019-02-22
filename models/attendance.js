const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recordSchema=new Schema({
    student:{
        type: Schema.Types.ObjectId,
        ref:"student" 
    },
    inAttendance:{
        type:Boolean,
        required:true
    }
})

const attendanceSchema = new Schema({
    course:{
        type:Schema.Types.ObjectId,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    students:[
        {
          type:Object,
          unique:true
        }
    ]
},{ collection : 'attendance' });

const attendRecord = mongoose.model("attendRecord", recordSchema);
const attendance = mongoose.model("attendance", attendanceSchema);

module.exports = {
    attendRecord:attendRecord,
    attendance:attendance
};