const db = require("../models/index");

module.exports = {
    checkLogin:function(userInfoToCheck,res){
        db.user.findOne({"userName":userInfoToCheck.username})
        .then((user)=>{
            if(user){
                console.log("SUcCESS! "+user)
                //check password
                let potentialUser = new db.user(user)
                console.log("password check "+potentialUser.validPassword(userInfoToCheck.password))

                db.userSession.create(user._id)
                .then(session=>{
                    console.log("session in backend is "+session)
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
    checkToken:function(token,res){
        db.userSession.findById(token)
        .then((session)=>{
            let {_id, date, isLoggedIn} = session;
            console.log("existing session is "+_id+" and it is valid!")
            res.send(session)
        })
        .catch(error=>{
            res.send();
            console.log(`sorry ${error}`)
        })
    },
    deleteToken:function(token){
        db.userSession.findByIdAndRemove(token)
        .then(result=>{
            console.log("session deleted! "+result)
            return
        })
    },
    add:function(data,res){

        // db.user.create(req.body)
        let newUser = new db.user();
        newUser.userName = data.userName
        newUser.password = newUser.generateHash(data.password)
        newUser.email = data.email
        newUser.firstName = data.firstName
        newUser.lastName = data.lastName
        newUser.save()
        .then(result=>{
            console.log(`congrats on adding an user!: ${result}`)
            res.send(result);
        })
        .catch(error=>{
            console.log(`you tried adding an user, but it's invalid: ${error}`)
            res.send(error)
        })
     
    },
    // getAll:function(req,res){
    //     db.user.find(req.query)
    //     // .sort({ date: -1 })
    //     .then(dbModel => res.json(dbModel))
    //     .catch(err => res.status(422).json(err));
    // },
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
