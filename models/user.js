const mongoose = require("mongoose");
const Schema = mongoose.Schema;

validateEmail = (email)=>{
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const userSchema = new Schema({
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
    userName:{
        trim:true,
        unique:true,
        type:String,
        required: true,
        minlength:3
    },
    password:{
        trim:true,
        type:String,
        required:true,
        minlength:2
    },

},{ collection : 'users' });


//look here for image info https://stackoverflow.com/questions/46631906/how-to-upload-save-and-show-pictures-with-mongoose-express-angular-4-and-nodejs 
const user = mongoose.model("user", userSchema);
module.exports = user;