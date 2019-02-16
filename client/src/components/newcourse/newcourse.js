import React, { Component } from "react";
import "./newcourse.css";
import DatePicker from "react-datepicker";
import TimePicker from 'react-time-picker';
import "react-datepicker/dist/react-datepicker.css";


class Newcourse extends Component {
  // Setting the component's initial state
  state = {
    course: "",
    startDate: new Date,
    location: "",
    numberofAvailablespots: 0,
    spotsLeft:2
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

    // Alert the user their first and last name, clear `this.state.firstName` and `this.state.lastName`, clearing the inputs
    alert(`A course titled ${this.state.course} \n  and is scheduled for ${this.state.startDate}  \n Located at ${this.state.location}
     with ${this.state.numberofAvailablespots} spots available `);

    console.log(this.state)
    
    // ({
    //     course: "",
    //     startDate: new Date,
    //     location: "",
    //     numberofAvailablespots: 0
    // })
  };


  handleChange(date) {

    this.setState({
      startDate: date
    })
   
  }

 

  render() {
    // Notice how each input has a `value`, `name`, and `onChange` prop
    return (
      <div>
        <h1>
           {this.state.course}
        </h1>
    
        <form className="form container">
        <label>
            Course: 
        </label>
          <input
            value={this.state.course}
            name="course"
            onChange={this.handleInputChange}
            type="text"
            placeholder="Course"
          />
          
     
        <label> 
            Location:
        </label>
            <input
            value={this.state.location}
            name="location"
            onChange={this.handleInputChange}
            type="text"
            placeholder="Location"
          />
          <label>
              Spots Available: 
          </label>
              <input
            value={this.state.spotsLeft}
            name="spotsLeft"
            
            type="number" 
            min="0"
             max="25"
            onChange= {(e) => this.handleInputChange(e)}
          /> 
          <label>
              Date:
              </label>  
            <DatePicker
        selected={this.state.startDate}
        onChange={ (e) => this.handleChange(e)}
        showTimeSelect
        dateFormat="Pp"
      /> 
         
         
         
          <button onClick={this.handleFormSubmit}>Submit</button>
        </form>
      </div>
    );
  }
}

export default Newcourse;



