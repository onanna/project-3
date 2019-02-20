
import React, { Component } from "react";
import "./style.css";



class Newinstructor extends Component {
  // Setting the component's initial state
  state = {
    name: "",
    image: "",
    phone: 0,
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
      <div >
        <h1>
           {this.state.name}
        </h1>
    
        <form className="form container">
        <label>
            Name: 
        </label>
          <input
        
            value={this.state.name}
            name="Name"
            onChange={this.handleInputChange}
            type="text"
        
          />
          
     
        <label> 
            Image:
        </label>
        <input type="image"
         src={this.state.image} 
         alt="Submit"
          width="48" 
          height="48" 
          value={this.state.image}
          onChange={this.handleInputChange}/>
          <label>
               Phone Number:
          </label>
          <span class="note">Format: 123-456-7890</span>
          <input 
          type="tel"
           id="phone" 
           name="phone"
           pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
           value={this.state.phone}
           onChange={this.handleInputChange}
          />
           
          <label>
              Email:
              </label>  
              <input type="email"
               id="email"
              size="30" 
              value={this.state.email}
              onChange={this.handleInputChange} />
          <button onClick={()=> this.handleFormSubmit()}>Submit</button>
        </form>
        </div>
    );
  }
}





export default Newinstructor;