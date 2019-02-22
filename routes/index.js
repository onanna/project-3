const passport = require('passport');
const FaceBookStrategy = require ('passport-facebook');
const path = require("path");
const router = require("express").Router();
import app from ('express');
const apiRoutes = require("./api");
const userRoutes = require("./user")


passport.use(
  new FaceBookStrategy(
    {
      clientID: '399803660586226',
      clientSecret: '7e083af07d653af5a94abcada1d1f64b',
      callbackURL: "https://b09f7076.ngrok.io/auth/facebook/callback",
    },
    (accessToken, refreshToken, profile, cb)=> {
      console.log(profile);
      cb(null, profile);
    },
  ),
);

app.use(passport.initialize());

app.get('/flogin',
  passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { session: false }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.send('AUTH WAS GOOD!');
  });


// // API Routes
router.use("/api", apiRoutes);
router.use("/user",userRoutes);

router.get("/",(req,res)=>{
  console.log(res)
})

// If no API routes are hit, send the React app
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;
