import React, { Component } from "react";
import "./style.css";
import Newinstructor from "../../components/newInstructorForm/newInstructorForm"
import PageContainer from "../../components/pageContainer";
import API from "../../utils/API"
import SelectInstructor from "../../components/select/selectInstructor";
import SelectStudent from "../../components/select/selectStudent"

class Newcourse extends Component {
  constructor(props) {
    super(props);
  // Setting the component's initial state

  this.state = {
    course: "",
     numberOfSeats: 25,
    startDate:Date,
    endDate: Date,
    startTime:"",
    endTime: "",
    location: ""
    
   
  };

 
  this.componentDidMount=()=>{
  }
  this.handleInputChange = event => {
    const { name, value } = event.target;
   
    // Updating the input's state 
    this.setState({
      [name]: value
    });

  
  }
  
  this.onChange = time => this.setState({ time })

  this.handleDateChange =() => {
    // Getting the value and name of the input which triggered the change
    
    let x = document.getElementsByClassName("datepicker")
    let dateChosen = x[0].value;
    console.log("val: " + x[0].value);
    console.log(dateChosen)
    this.setState({
      startDate:dateChosen,
      endDate: dateChosen
    })
    
  };

  this.ddInstructors = () => {
    let x = []
    
  }
  this.handleFormSubmit = event => {
    // Preventing the default behavior of the form submit (which is to refresh the page)
    event.preventDefault();

    
    

    let dataToSend={
      course: this.state.course,
      numberOfSeats: this.state.numberOfSeats,
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      startTime: this.state.startTime,
      endTime: this.state.endTime,
      location: this.state.location,
      instructors:[],
      students:[]
    }

    //add validation


    // API.addCourse(dataToSend)
    console.log(dataToSend)
    console.log(this.state)

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


  // handleChange(date) {

  //   this.setState({


  //     startDate: date
  //   })
   
  // }

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
          />  <label>Start Time:</label>
        {/* <Col>
          <TextField
      
        
        type="text"
        
        
        value={this.state.startTime} 
        onChange={this.handleInputChange}
        
      />
      </Col> */}
      {/* <input
            value={this.state.startTime}
            name="start"
            onChange={this.handleInputChange}
            type="time"
          /> */}
    

        {/* <input
            value={this.state.startTime}
            name="starttime"
            onChange={this.handleInputChange}
            type="text"
            placeholder="Start Time"
          />  */}
          <input type="text"  
          name="starttime" 
          value={this.state.startTime} 
          onChange={(ev) => {this.setState({startTime:ev.target.value})}}
         pattern ={/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/}
        required />
{/* 
        <TimePicker  
         onChange={this.onChange}
         value={this.state.startTime}
        /> */}
           <label> 
            End Time:
        </label>
         <input
            value={this.state.endTime}
            name="endtime"
            onChange={(ev) => {this.setState({endTime:ev.target.value})}}
            type="text"
            placeholder="Endtime"
          />
          
          <label> Start Date:</label>  
          <input type="text" className="datepicker" value={this.state.startDate} onChange={this.handleDateChange} />
          
          <label> End Date:</label>  
          <input type="text" className="datepicker" value={this.state.endDate} onChange={this.handleDateChange} />
       
         
        </form>
         
        <div>
          
  
           <a className="waves-effect waves-light btn modal-trigger" href="#modal1">Add New Instructor</a>

  
            <div id="modal1" className="modal">
              <div className="modal-content">
               <Newinstructor />
              </div>
    
            </div>
        </div>
       <SelectInstructor />
      <SelectStudent />
      <form>
      <button onClick={this.handleFormSubmit}>Submit</button>
      </form>
      </PageContainer>
    );
  }
}

export default Newcourse;



