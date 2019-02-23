const router = require("express").Router();

//matches with "/auth/login" 
router.get("/login",(req,res)=> { 
    res.render('login');
})

//logout route
router.get("/logout", (req,res) => {
    res.send('logging out');
    console.log('logging out route hit');
})

//route for login with google 
router.get("/google",(req,res)=> { 
    // will handle this with passport later
    res.send('Hitting /auth/google route');
    console.log('Hitting /auth/google route');
})

module.exports = router;