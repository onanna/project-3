
import React, { Component } from "react";
// import "./newinstructor.css";
import InputFile from "../inputFile/inputFile"
import "./style.css";



class Newinstructor extends Component {

  constructor(props){
    super(props);
  
  // Setting the component's initial state
  this.state = {
   firstName: "",
   lastName: "",
   email:"",
   phone:""
  }

  this.handleInputChange = event => {
    const { name, value } = event.target;
   
    // Updating the input's state 
    this.setState({
      [name]: value
    });

  
  }

  this.handleFormSubmit = event => {
    // Preventing the default behavior of the form submit (which is to refresh the page)
   event.preventdefault();

    // Alert the user their first and last name, clear `this.state.firstName` and `this.state.lastName`, clearing the inputs
    alert(`Course Instructor ${this.state.firstName} \n  has the following email ${this.state.email}  \n and phone number ${this.state.phone} `);

    console.log(this.state)
  };
  }

  render() {
  
    return (
      <div >
        <h1>
           {this.state.firstName} {this.state.lastName}
        </h1>
    
        <form className="form container">
        <label> FirstName: </label>
          <input
        
            value={this.state.firstName}
            name="firstName"
            onChange={this.handleInputChange}
            type="text"
        
          />
          <label>LastName: </label>
          <input
        
            value={this.state.lastName}
            name="lastName"
            onChange={this.handleInputChange}
            type="text"
        
          />
          
     
        
        
        <label>Phone Number: </label>
          
          <input 
          type="tel"
           id="phone" 
           name="phone"
           pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
           value={this.state.phone}
           onChange={this.handleInputChange}
          />
           
          <label>Email:</label>  
          <input type="email"
               name="email"
              size="30" 
              value={this.state.email}
              onChange={this.handleInputChange} />
         
         </form>

       
       
      <form>
      <button onClick={()=> this.handleFormSubmit()}>Submit</button>
        </form>
        
        </div>
    );
  }
}





export default Newinstructor;