const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSessionSchema = new Schema({
    userId:{
        type: String,
        trim:true
    },
    time:{
        type:Date,
        default:Date.now()
    },
    isLoggedIn:{
        type:Boolean,
        default:false
    }

},{ collection : 'sessions' });


//look here for image info https://stackoverflow.com/questions/46631906/how-to-upload-save-and-show-pictures-with-mongoose-express-angular-4-and-nodejs 
const userSession = mongoose.model("userSession", userSessionSchema);
module.exports = userSession;