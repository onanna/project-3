const router = require("express").Router();
const user = require("../controllers/userController")

//matches with "/auth/login" 
router.route("/login")
    .get((req,res)=>{
    })
    .post((req,res)=>{
        user.checkLogin(req.body,res)
    })

router.route("/token/:token")
    .post((req,res)=>{
        user.checkToken(req.body,res)
    })
    .get((req,res)=>{
        if(req.params.token){
            user.checkToken(req.params.token,res)
        }
    })
    .delete((req,res)=>{
        user.deleteToken(req.params.token)
    })

//logout route
router.get("/logout", (req,res) => {
    res.send('logging out');
})

//route for login with google 
router.get("/google",(req,res)=> { 
    // will handle this with passport later
    res.send('Hitting /auth/google route');
})

module.exports = router;