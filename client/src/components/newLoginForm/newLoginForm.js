
import React, { Component } from "react";
import "./newLoginForm.css";
import SubmitButton from "../submitButton"
import API from "../../utils/API"


class Newloginform extends Component {

  constructor(props){
    super(props);
    console.log("props are "+JSON.stringify(this.props))
  }

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

    // Alert the user their first and last name, clear `this.state.firstName` and `this.state.lastName`, clearing the inputs
    // alert(`Course Instructor ${this.state.name} \n  has the following email ${this.state.email}  \n and phone number ${this.state.phone} `);

    // console.log(userLoginInfo)
    API.submitUserLogin(userLoginInfo)
    .then(res=>{
      res.data.error?
        console.log("error is"+JSON.stringify(res.data.error))
      :
        console.log("session id is "+JSON.stringify(res.data._id))
        this.props.updateLogin(res.data._id);
        ;
    })
    .catch(error=>{
      console.log("ERROR IS "+error)
    })

    //clear the state
};
  render() {
        return (
            <div>

              <div className="container">

                <div className="row">
                  {/* <div className="col s6 offset-s6 center-align"> */}
                  <div className="col s6 center-align">
                    <div className="card hoverable">
                    <div className="card-content">
                    
                            <div className="input-field">
                                <input onChange={this.handleInputChange} name="username" id="username" type="text" />
                                <label className="active" htmlFor="last_name">Username</label>
                            </div>

                            <div className="input-field">
                                <input onChange={this.handleInputChange} id="lastName" type="password" name="password" />
                                <label className="active" htmlFor="last_name">Password</label>
                            </div>

                            <SubmitButton submitFunction={this.handleFormSubmit} />
                        </div>
                      </div>
                    </div>
                </div>
              
              </div>
                {/* <form className="form container">
                        <div className="card">
                            <div className="card-action teal lighten-1 white-text">
                                <h3>Login Form</h3>
                            </div>
                            
                            <div className="card-content">
                                <div className="form-field">
                                    <label for="username">Username</label>
                                    <input type="text" value={this.state.name} name="Name" onChange={this.handleInputChange}></input>
                                </div>
                            </div>

                            <div className="form-field">
                                <label for="password">Password</label>
                                <input type="password" value={this.state.password} name="Password" onChange={this.handleInputChange}></input>
                            </div>
                
                            <div className="form-field">
                              <button onClick={()=> this.handleFormSubmit()}>Submit</button>
                            </div>
                        </div>
                </form> */}
            </div>
        );
    }
}


export default Newloginform;