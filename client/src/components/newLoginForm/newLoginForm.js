
import React, { Component } from "react";
import "./newLoginForm.css";


class Newloginform extends Component {
  // Setting the component's initial state
  state = {
    name: "",
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
   event.preventdefault();

    // Alert the user their first and last name, clear `this.state.firstName` and `this.state.lastName`, clearing the inputs
    alert(`Course Instructor ${this.state.name} \n  has the following email ${this.state.email}  \n and phone number ${this.state.phone} `);

    console.log(this.state)
};
  render() {
  
        return (
            <div>
                <form className="form container">
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
                </form>
            </div>
        );
    }
}


export default Newloginform;