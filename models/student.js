const mongoose = require("mongoose");
const Schema = mongoose.Schema;

validateEmail = (email)=>{
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const stuSchema = new Schema({
    firstName:{
        type: String,
        required:true,
        trim:true
    },
    lastName:{
        type: String,
        required:true
    },
    userName:{
        type: String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        unique:true,
        type:String,
        required: true,
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    }

},{ collection : 'students' });


//look here for image info https://stackoverflow.com/questions/46631906/how-to-upload-save-and-show-pictures-with-mongoose-express-angular-4-and-nodejs 
const student = mongoose.model("student", stuSchema);
module.exports = student;