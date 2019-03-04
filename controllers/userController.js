const db = require("../models/index");

module.exports = {
    new:function(req,res){
        console.log("about to add a new user to users: "+JSON.stringify(req.body))
        db.user.create(req.body)
        .then(result=>{
            console.log(`congrats on adding a new user!: ${result}`)
            res.json(result);
        })
        .catch(error=>{
            console.log(`you tried adding a user, but it's invalid: ${error}`)
        })
    },
    checkLogin:function(userInfoToCheck,res){
        db.user.findOne({"userName":userInfoToCheck.username})
        .then((user)=>{
            if(user._id){
                console.log("SUcCESS! "+user)
                let potentialUser = new db.user(user)
                console.log("password check "+potentialUser.validPassword(userInfoToCheck.password))

                if(potentialUser.validPassword(userInfoToCheck.password)===true){
                    // db.userSession.create(user._id)
                    let newSession = new db.userSession();
                    newSession.user=user._id;
                    newSession.save()
                    .then(session=>{
                        console.log("session in backend is "+session)
                        res.send({
                            session:session,
                            user:{
                                id:user._id,
                                firstName:user.firstName,
                                lastName:user.lastName,
                                email:user.email,
                                userName:user.userName
                            }
                        });
                    })    
                    .catch(error=>{
                        // res.send({error:"There was an error with your E-Mail/Password combination. Please try again."})
                        res.send({error:"error making session "+ error})                        
                    })
                }else{
                    res.send({error:"There was an error with your E-Mail/Password combination. Please try again."})
                }
            }else{
                res.send({error:"There was an error with your E-Mail/Password combination. Please try again."});
            } 
        })
        .catch(error=>{
            res.send({error:"There was an error with your E-Mail/Password combination. Please try again."});
        })
    },
    checkToken:function(token,res){
        db.userSession.findById(token)
        .then((session)=>{
            let {_id, user} = session;
            console.log("session found is "+_id)
            if(_id){
                db.user.findById(user)
                .then(result=>{
                    if(result._id){
                        res.send({
                            session:session,
                            user:{
                                id:result._id,
                                firstName:result.firstName,
                                lastName:result.lastName,
                                email:result.email,
                                userName:result.userName
                            }
                        })
                    }else{
                        res.send({error:'No Session Found'})
                    }
                })
                .catch(error=>{
                    res.send({error:'error: the user associated with this token was not found'});
                })
            }
            
        })
        .catch(error=>{
            console.log(`token not found ${error}`)
            res.send({error:'error '+error});
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
