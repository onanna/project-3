import React, { Component } from "react";
import Pagecontainer from "../../components/pageContainer/index";
import Header from "../../components/h1withDivider"
import API from "../../utils/API" 
import './style.css'

class userProfile extends Component{
    state={
        id:'',
        firstName:'',
        lastName:'',
        email:'',
        userName:''
    }
    
    constructor(props){
        super(props)
        console.log("props are "+JSON.stringify(this.props.user))
    }

    edit=(whatsEdited)=>{
        let whatToUpdate = whatsEdited.substring(0,whatsEdited.indexOf('Profile'))
        let newValue = document.getElementById(whatsEdited).value

        this.setState((prev)=>({
            [whatToUpdate]:newValue
        }))
    }

    render(){
        return(
            <Pagecontainer>
                <Header align='left' text={this.props.user.userName}/>

                <div className='card-panel'>
                    <div className='row'>
                        <div className="col s12">
                            <p className='flow-text profileCardTitle'>Username</p>
                            <br></br>
                            <h4>{this.props.user.userName}</h4>

                            <div className="input-field">
                                <input onChange={()=>this.edit('userNameProfile')}  id="userNameProfile" type="text"/>
                                <label  className='flow-text' htmlFor="userNameProfile">Edit</label>
                            </div>
                        </div>
                    </div>

                    <div className='profileDivider divider'></div>
                    <br></br>
                    <br></br>

                    <div className='row'>
                        <div className="col s12">
                            <p className='flow-text profileCardTitle'>Email</p>
                            <br></br>
                            <h4>{this.props.user.email}</h4>

                            <div className="input-field">
                                <input  onChange={()=>this.edit('emailProfile')}id="emailProfile" type="text"/>
                                <label  className='flow-text' htmlFor="emailProfile">Edit</label>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='card-panel hoverable'>
                    <div className='row center-align'>
                        <div className="col s6">
                            <p className='flow-text profileCardTitle'>First Name</p>
                            <div className='divider'></div>
                            <br></br>
                            <h4>{this.props.user.firstName}</h4>

                            <div className="input-field">
                                <input  onChange={()=>this.edit('firstNameProfile')} id="firstNameProfile" type="text"/>
                                <label  className='flow-text' htmlFor="firstNameProfile">Edit</label>
                            </div>
                        </div>


                        <div className="col s6">
                            <p className='flow-text profileCardTitle'>Last Name</p>
                            <div className='divider'></div>
                            <br></br>
                            <h4>{this.props.user.lastName}</h4>

                            <div className="input-field">
                                <input  onChange={()=>this.edit('lastNameProfile')} id="lastNameProfile" type="text"/>
                                <label  className='flow-text' htmlFor="lastNameProfile">Edit</label>
                            </div>
                        </div>
                    </div>
                </div>

            </Pagecontainer>
        )
    }
}

export default userProfile;