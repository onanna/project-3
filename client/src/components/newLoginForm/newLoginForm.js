
import React, { Component } from "react";
import "./newLoginForm.css";
import SubmitButton from "../submitButton"
import API from "../../utils/API"
import styles from "./newLoginForm.css"


class Newloginform extends Component {

  // constructor(props){
  //   super(props);
  //   console.log("props are "+JSON.stringify(this.props))
  // }

  // Setting the component's initial state
  state = {
    username: "",
    password: "",
    email:""
  };
  

  handleInputChange = event => {
    // Getting the value and name of the input which triggered the change
    const { name, value } = event.target;

    // Updating the input's state
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    // Preventing the default behavior of the form submit (which is to refresh the page)
   event.preventDefault();

   let userLoginInfo={
     username:this.state.username,
     password:this.state.password
   }

    API.submitUserLogin(userLoginInfo)
    .then(res=>{

      if(res.data.error){
        console.log("error is"+JSON.stringify(res.data.error))

      }else{
        console.log("session id is "+JSON.stringify(res.data.session._id))
        this.props.setSessionToken(res.data.session,res.data.user);
      }
    })
    .catch(error=>{
      console.log("ERROR IS IN loginForm "+error)
    })

    //clear the state
};
  render() {
        return (
            <div>

              <div className="container">

                <header className="col s6 center-align">
                    <h1>Create New Login</h1>
                </header>

                <div className="row">
                  <div className="col s6 center-align">
                    <div className="card hoverable newloginclass z-depth-5">
                    <div className="card-content">
                    
                            <div className="input-field">
                                <i className="material-icons prefix">person</i>
                                <input onChange={this.handleInputChange} name="username" id="username" type="text" />
                                <label className="active" htmlFor="last_name">Username</label>
                            </div>

                            <div className="input-field">
                                <i className="material-icons prefix">lock</i>
                                <input onChange={this.handleInputChange} id="lastName" type="password" name="password" />
                                <label className="active" htmlFor="last_name">Password</label>
                            </div>

                            <SubmitButton submitFunction={this.handleFormSubmit} />

                            <a class="btn-large waves-effect waves-light z-depth-5 submitbtnclass go-back-btn" href="/login">Have a login already?</a>

                        </div>
                      </div>
                    </div>
                </div>
              </div>
            </div>
        );
    }
}


export default Newloginform;