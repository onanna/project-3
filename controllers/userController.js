const db = require("../models/index");

module.exports = {
    checkLogin:function(userInfoToCheck,res){
        db.user.findOne({"userName":userInfoToCheck.username})
        .then((user)=>{
            if(user._id){
                let potentialUser = new db.user(user)

                if(potentialUser.validPassword(userInfoToCheck.password)===true){
                    let newSession = new db.userSession();
                    newSession.user=user._id;
                    newSession.save()
                    .then(session=>{
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
                        res.send({error:"error making session "+ error})                        
                    })
                }else{
                    res.send({error:"There was an error with your Username/Password combination. Please try again."})
                }
            }else{
                res.send({error:"There was an error with your Username/Password combination. Please try again."});
            } 
        })
        .catch(error=>{
            res.send({error:"There was an error with your Username/Password combination. Please try again."});
        })
    },
    checkToken:function(token,res){
        db.userSession.findById(token)
        .then((session)=>{
            let {_id, user} = session;
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
            res.send({error:'error '+error});
        })
    },
    deleteToken:function(token){
        db.userSession.findByIdAndRemove(token)
        .then(result=>{
            return
        })
    },
    add:function(data,res){

        let newUser = new db.user();
        newUser.userName = data.userName
        newUser.password = newUser.generateHash(data.password)
        newUser.email = data.email
        newUser.firstName = data.firstName
        newUser.lastName = data.lastName
        newUser.save()
        .then(result=>{
            let newSession = new db.userSession();
                    newSession.user=result._id;
                    newSession.save()
                    .then(session=>{
                        res.send({
                            session:session,
                            user:{
                                id:result._id,
                                firstName:result.firstName,
                                lastName:result.lastName,
                                email:result.email,
                                userName:result.userName
                            }
                        });
                    })    
                    .catch(error=>{
                        // res.send({error:"There was an error with your E-Mail/Password combination. Please try again."})
                        res.send({error:"error making session "+ error})                      
                    })
        })
        .catch(error=>{
            if(error.code){
                if(error.errmsg.includes('email_1')) res.send({error:"An account already exists with that email address"})
                if(error.errmsg.includes('userName_1')) res.send({error:"Sorry. Username already exists"})
            }else{
                res.send(error)
            }
        })
     
    },
    delete:function(idToDelete){
        db.user.remove({_id:idToDelete})
        .then(result=>{console.log("user deleted! "+result)})
    },
    update:function(filter,update,res){
        db.user.findOneAndUpdate(filter,update)
        .then(result=>console.log(result))
    }
};
