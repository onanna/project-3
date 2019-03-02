const db = require("../models/index");

module.exports = {
    checkLogin:function(userInfoToCheck,res){
        db.user.findOne({"userName":userInfoToCheck.username})
        .then((user)=>{
            if(user._id){
                console.log("SUcCESS! "+user)
                //check password
                let potentialUser = new db.user(user)
                console.log("password to check "+userInfoToCheck.password)
                console.log('correct password '+user.password)

                
                if(potentialUser.validPassword(userInfoToCheck.password)===true){
                    console.log('creating new session')
                    db.userSession.create(user._id)
                    .then(session=>{
                        console.log("session in backend is "+session)
                        res.send(session);
                    })    
                    .catch(error=>{
                        res.send(error);
                    })
                }else{
                    console.log('password is wrong af')
                    res.end();
                }
            }else{
                res.send({error:"user not found"});
            } 
        })
        .catch(error=>{
            console.log('failed at findOne')
            console.log(`sorry, that was invalid input ${error}`)
        })
    },
    checkToken:function(token,res){
        if(token==='undefined'||token===''){
            console.log('token passed is undefined')
            res.send('token is invalid')
        }else{
            console.log('token to check exists. running check')
            db.userSession.findById(token)
            .then((session)=>{
                let {_id, date, isLoggedIn} = session;
                console.log("existing session is "+_id+" and it is valid!")
                if(session){
                    res.send(session)
                }else{
                    res.send('ERROR TOKEN NOT VALID')
                }
            })
            .catch(error=>{
                res.send('error no token');
                console.log(`sorry ${error}`)
            })
        }
    },
    deleteToken:function(token){
        db.userSession.findByIdAndRemove(token)
        .then(result=>{
            console.log("session deleted! "+result)
            return
        })
    },
    newToken:function(){

    },
    add:function(data){

        //different way of creating and adding mongoose model. 
        //used because of bcrypt and the necessity of password encryption
        let newUser = new db.user();
        newUser.userName = data.userName
        newUser.password = newUser.generateHash(data.password)
        newUser.email = data.email
        newUser.firstName = data.firstName
        newUser.lastName = data.lastName;
        if(newUser.userName&&newUser.password&&newUser.email&&newUser.firstName&&newUser.lastName){
            newUser.save()
            .then(result=>{
                console.log(`congrats on adding an user!: ${result}`)
                //create token for new user
                // db.userSession.create(result._id)
                // .then(session=>{
                //     console.log("session in backend is "+session)
                //     res.send(session);
                // })    
                // .catch(error=>{
                //     res.send(error);
                // })
            })
            .catch(error=>{
                console.log(`you tried adding an user, but it's invalid: ${error}`)
            })
        }else{
            
        }
     
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
