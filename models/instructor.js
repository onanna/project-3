const mongoose = require("mongoose");
const Schema = mongoose.Schema;

validateEmail = (email)=>{
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const instructorSchema = new Schema({
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
        type:String,
        required: true,
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    phone:{
        trim:true,
        type:String
    },
    currentlyTeaching:[{
        type: Schema.Types.ObjectId, 
        ref: "course",
        default:[]
    }],
    pastCourses:[{
        type: Schema.Types.ObjectId, 
        ref: "course",
        default:[]
    }]

},{ collection : 'instructors' });


//look here for image info https://stackoverflow.com/questions/46631906/how-to-upload-save-and-show-pictures-with-mongoose-express-angular-4-and-nodejs 
const instructor = mongoose.model("instructor", instructorSchema);
module.exports = instructor;