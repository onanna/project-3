import React, { Component } from "react";
import "./style.css";
import Newinstructor from "../../components/newInstructorForm/newInstructorForm"
import PageContainer from "../../components/pageContainer";
import API from "../../utils/API"
import SelectInstructor from "../../components/select/selectInstructor";
import SelectStudent from "../../components/select/selectStudent"
//import $ from "jquery"

class Newcourse extends Component {
  constructor(props) {
    super(props);
  // Setting the component's initial state

  this.state = {
    course: "",
    numberOfSeats:25,
    startDate:"",
    endDate:"",
    startTime:"",
    endTime: "",
    location: "",
    selectInstructors: [],
    selectStudents:[]
  };

 
  this.componentDidMount=()=>{
    // $(".datepicker").datepicker({
    //       format: "mm-dd-yyyy",
    //       // maxDate: new Date(),
    //       autoClose: true,
    //       onClose: function(datePicked) {
      
    //         let date = $(".datepicker")[0].value;
    //         let mm = date.split("-")[0];
    //         let dd = date.split("-")[1];
    //         let yyyy = date.split("-")[2];
      
    //       }
    //   });
  }
  this.handleInputChange = event =>{
    const {name, value} = event.target

    this.setState({
      [name]: value
    })
  }
  this.handleSelectedInstructorsChange = event => {


    const { name, options } = event.target;
    var value = [];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }

    this.setState({
      [name]: value
    }, ()=>    console.log(this.state.selectInstructors)  
    );

  }
  this.handleSelectedStudentsChange = event => {


    const { name, options } = event.target;
    var value = [];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }

    this.setState({
      [name]: value
    }, ()=>    console.log(this.state.selectStudents)  
    );

  }
  
  this.onChange = time => this.setState({ time })

  // this.handleDateChange =() => {
  //   // Getting the value and name of the input which triggered the change
    
  //   let x = document.getElementById("startDatePicker")
  //   let y = document.getElementById("endDatePicker")
  //   console.log('datepicker is '+ x)
  //   let startdateChosen = x.value;
  //   let enddateChosen = y.value;
    

  
   
   
  //   this.setState({
  //     startDate:startdateChosen,
  //     endDate: enddateChosen
  //   })
    
  // };

  
  this.handleFormSubmit = event => {
    // Preventing the default behavior of the form submit (which is to refresh the page)
    event.preventDefault();


    let x = document.getElementById("startDatePicker")
    let y = document.getElementById("endDatePicker")
    console.log('datepicker is '+ x.value)
    console.log('datepicker is '+ y.value)

    let startdateChosen = x.value;
    let enddateChosen = y.value;

    let dataToSend={
      course: this.state.course,
      numberOfSeats: this.state.numberOfSeats,
      startDate: startdateChosen,
      endDate: enddateChosen,
      startTime: this.state.startTime,
      endTime: this.state.endTime,
      location: this.state.location,
      selectInstructors: this.state.selectInstructors,
      selectStudents:this.state.selectStudents
    }

    //add validation

    // debugger

   API.addCourse(dataToSend)
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
            value={this.state.numberOfSeats}
            name="numberOfSeats"
            
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
          <input type="text" id='startDatePicker' className="datepicker" value={this.state.startDate}
            // onChange={this.handleDateChange} 
          />
          
          <label> End Date:</label>  
          <input type="text" id='endDatePicker' className="datepicker" value={this.state.endDate}
          //  onChange={this.handleDateChange}
            />
       
         
        </form>
         
        <div>
          
  
           <a className="waves-effect waves-light btn modal-trigger" href="#modal1">Add New Instructor</a>

  
            <div id="modal1" className="modal">
              <div className="modal-content">
               <Newinstructor />
              </div>
    
            </div>
        </div>
       <SelectInstructor value={this.state.instructors} onChange={this.handleSelectedInstructorsChange} />
      <SelectStudent value={this.state.students} onChange={this.handleSelectedStudentsChange} />
      <form>
      <button onClick={this.handleFormSubmit}>Submit</button>
      </form>
      </PageContainer>
    );
  }
}

export default Newcourse;



