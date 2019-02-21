import React, { Component } from "react";
import "./style.css";
import Newinstructor from "../../components/newInstructorForm/newInstructorForm"
import PageContainer from "../../components/pageContainer";
import API from "../../utils/API"
class Newcourse extends Component {
  // Setting the component's initial state
  state = {
    course: "",
    startDate: new Date,
    location: "",
    numberofAvailablespots: 0,
    spotsLeft:2
  };
  
  componentDidMount=()=>{
  }

  handleDateChange = (newValue) => {
    // Getting the value and name of the input which triggered the change
    // const { name, value } = event.target;

    // console.log(newValue)
    let x = document.getElementsByClassName("datepicker")
    console.log(x.value);

    // Updating the input's state
    // this.setState({
    //   [name]: value
    // });
  };

  handleFormSubmit = event => {
    // Preventing the default behavior of the form submit (which is to refresh the page)
    event.preventDefault();

    let x = document.getElementsByClassName("datepicker")
    let dateChosen = x[0].value;
    console.log(dateChosen)
    this.setState({
      startDate:dateChosen
    })

    let dataToSend={
      name:"someNamsdfe",
      numberOfSeats:20,
      startDate: new Date(),
      endDate: 48,
      startTime: "some time",
      endTime: "end time",
      location:"some address",
      instructors:[],
      students:[]
    }

    //add validation


    API.addCourse(dataToSend)

    // // Alert the user their first and last name, clear `this.state.firstName` and `this.state.lastName`, clearing the inputs
    // alert(`A course titled ${this.state.course} \n  and is scheduled for ${this.state.startDate}  \n Located at ${this.state.location}
    //  with ${this.state.numberofAvailablespots} spots available `);
    // console.log(this.state)
    
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
      <PageContainer>
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
             onChange={this.handleInputChange}
          /> 
          <label>Date:</label>  
          <input type="text" className="datepicker" value={this.state.startDate} onChange={()=>this.handleDateChange()} />
          
          <button onClick={this.handleFormSubmit}>Submit</button>
        </form>
        <div>
          
  
           <a className="waves-effect waves-light btn modal-trigger" href="#modal1">Add New Instructor</a>

  
            <div id="modal1" className="modal">
              <div className="modal-content">
               <Newinstructor />
              </div>
    
            </div>
        </div>
        <select>
  <option value="Jake">Jake</option>
  <option value="Albert">Albert</option>
  <option value="Linda">Linda</option>
  <option value="Van">Van</option>
          </select>

      </PageContainer>
    );
  }
}

export default Newcourse;



