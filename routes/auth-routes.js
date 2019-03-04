const router = require("express").Router();
const user = require("../controllers/userController")

// router.get("/login",(req,res)=> { 
    //     // res.render('login');
    // //     return console.log('inside GET /auth/login')
    //     console.log("getting the /auth/login")
    // })
    
    
//matches with "/auth/login" 
router.route("/login")
    .get((req,res)=>{
         console.log('inside GET /auth/login')
    })
    .post((req,res)=>{
        console.log("user login info entered on front end is: "+JSON.stringify(req.body))
        //here is where you would use the userController.js functions to actually check the database
        user.checkLogin(req.body,res)
    })

router.route("/token/:token")
    .post((req,res)=>{
        console.log("inside token post route")
        user.checkToken(req.body,res)
    })
    .get((req,res)=>{
        console.log("inside token check GET")
        console.log("token is "+req.params.token)
        // res.send(req.body)
        user.checkToken(req.params.token,res)
    })
    .delete((req,res)=>{
        user.deleteToken(req.params.token)
    })


//matches with 
// router.get("/newloginform", (req,res)=> {
//     res.render('newloginform');
// })


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