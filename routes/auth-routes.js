const router = require("express").Router();

// //matches with "/auth/login" 
// router.get("/login",(req,res)=> { 
//     // res.render('login');
// })


router.route('/login')
    .get((req,res) => {
            console.log("inside the /auth/login route")
    })
    .post((req,res)=> {

    })

//matches with 
router.get("/newloginform", (req,res)=> {
    res.render('newloginform');
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