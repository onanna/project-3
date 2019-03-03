const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const userModel = require("../models/user")

passport.use(new LocalStrategy(
  function(username, password, done) {

    userModel.findOne({"userName":username})
    .then(result=>{
        if (result){
            console.log("user was found")
            if(password===result.password){
                return console.log("password is correct")
            }
        }else{
            console.log("error. no user here")
            return done(null, false)
        }
    })

    //   UserDetails.findOne({
    //     username: username
    //   }, function(err, user) {
    //     if (err) {
    //       return done(err);
    //     }

    //     if (!user) {
    //       return done(null, false);
    //     }

    //     if (user.password != password) {
    //       return done(null, false);
    //     }
    //     return done(null, user);
    //   });
  }
));

// app.post('/',
//   passport.authenticate('local', { failureRedirect: '/error' }),
//   function(req, res) {
//     res.redirect('/success?username='+req.user.username);
//   });