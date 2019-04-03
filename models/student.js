const mongoose = require("mongoose");
const Schema = mongoose.Schema;

validateEmail = (email)=>{
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const stuSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: "user",
        required:true
    },
    firstName:{
        type: String,
        required:true,
        trim:true
    },
    lastName:{
        type: String,
        required:true,
        trim:true
    },
    email:{
        trim:true,
        unique:true,
        type:String,
        required: true,
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    phone:{
        trim:true,
        type:String
    },
    currentlyEnrolled:[{
        type: Schema.Types.ObjectId, 
        ref: "course",
        // required:true,
        default:[]
    }],
    pastCourses:[{
        type: Schema.Types.ObjectId, 
        ref: "course",
        // required:true,
        default:[]    
    }]

},{ collection : 'students' });


//look here for image info https://stackoverflow.com/questions/46631906/how-to-upload-save-and-show-pictures-with-mongoose-express-angular-4-and-nodejs 
const student = mongoose.model("student", stuSchema);
module.exports = student;