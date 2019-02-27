const db = require("../models/index");

module.exports = {
    checkLogin:function(userInfoToCheck,res){
        db.user.findOne({"userName":userInfoToCheck.username})
        .then((user)=>{
            if(user){
                console.log("SUcCESS! "+user)
                //check password
                
                
                db.userSession.create(user._id)
                .then(session=>{
                    res.send(session);
                })    
                .catch(error=>{
                    res.send(error);
                })
            }else{
                res.send({error:"user not found"});
            } 
        })
        .catch(error=>{
            console.log(`sorry, that was invalid input ${error}`)
        })
    },
    checkToken:function(token){
        db.userSession.findById(token)
        .then((session)=>{
            let {_id, date, isLoggedIn} = session;
            console.log("new session is "+_id)
        })
        .catch(error=>{
            console.log(`sorry ${error}`)
        })
    },
    add:function(req){

        db.user.create(req.body)
        .then(result=>{
            console.log(`congrats on adding an user!: ${result}`)
        })
        .catch(error=>{
            console.log(`you tried adding an user, but it's invalid: ${error}`)
        })
     
    },
    getAll:function(req,res){
        db.user.find(req.query)
        // .sort({ date: -1 })
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err));
    },
    delete:function(idToDelete){
        db.user.remove({_id:idToDelete})
        .then(result=>{console.log("user deleted! "+result)})
    },
    update:function(filter,update,res){
        console.log(filter,update)
        db.user.findOneAndUpdate(filter,update)
        .then(result=>console.log(result))
        // .then(this.getAll(""))

    }
};
