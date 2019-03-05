import React, { Component } from "react";
import "./style.css";
import Newinstructor from "../../components/newInstructorForm/newInstructorForm"
import PageContainer from "../../components/pageContainer";
import API from "../../utils/API"
import SelectInstructor from "../../components/selectInstructors/selectInstructors";
import SelectStudent from "../../components/selectStudents/selectStudents"
import Submit from '../../components/submitButton/index'
import Header from '../../components/h1withDivider/index'
//import $ from "jquery"
const $ = window.$;

class Newcourse extends Component {
  constructor(props) {
    super(props);
  // Setting the component's initial state

  this.state = {
    name: "",
    numberOfSeats:'',
    startDate:"",
    endDate:"",
    startTime:"",
    endTime: "",
    location: "",
    selectInstructors: [],
    selectStudents:[],
    instructors:[],
    students:[]
  };

 this.getSelectedInstructors=(selected)=>{
        console.log(selected)
        let instructorsSelected =[]
        selected.forEach((element,i) => {
            instructorsSelected.push(element.value)
        });
        this.setState({
            instructors:instructorsSelected
        })
        // console.log($("#instructorSelect"))
    }

    this.getSelectedStudents=(selected)=>{
        console.log(selected)
        let studentsSelected =[]
        selected.forEach((element,i) => {
            studentsSelected.push(element.value)
        });
        this.setState({
            students:studentsSelected
        })
        // console.log($("#instructorSelect"))
    }
  this.componentDidMount=()=>{
    $(".datepicker").datepicker({
      format: "mm-dd-yyyy",
      autoClose: true
    });
  }
  this.handleInputChange = event =>{
    const {name, value} = event.target

    this.setState({
      [name]: value
    })
  }
  this.handleSelectedInstructorsChange = event => {


    const { name, options} = event.target;
    
    var lem = [];
    var value2 =[];
    
  
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        lem.push(options[i].value);
      }
      if(options[i].selected){
        value2.push(options[i].accessKey)
      }
        }
    

    this.setState({
      selectInstructors: value2,
      instructors:lem
    }, ()=>   { 
      console.log(this.state.selectInstructors);
      console.log(this.state.instructors);
    })
    

  }
  
  this.handleSelectedStudentsChange = event => {

    const { name, options} = event.target;
    
    var lem = [];
    var value2 =[];
    
  
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        lem.push(options[i].value);
      }
      if(options[i].selected){
        value2.push(options[i].accessKey)
      }
        }
    

    this.setState({
      selectStudents: value2,
      students:lem
    }, ()=>   { 
      console.log(this.state.selectStudents);
      console.log(this.state.students);
    })
  }
  
  this.onChange = time => this.setState({ time })

  
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
      name: this.state.name,
      numberOfSeats: this.state.numberOfSeats,
      startDate: startdateChosen,
      endDate: enddateChosen,
      startTime: this.state.startTime,
      endTime: this.state.endTime,
      location: this.state.location,
      instructors: this.state.instructors,
      students:this.state.students
    }

    //add validation

    // debugger

   API.addCourse(dataToSend)
   .then(result=>{
      if(result.data._id){
        // alert("SUCCESSFUL!")
        window.location.href = "/";
      }else{
        alert("COURSE NAME ALREADY EXISTS")
      }
   })
   .catch(error=>{
     alert('ERROR '+JSON.stringify(error))
   })
    console.log(dataToSend)
    console.log(this.state)
  };

  }

  render() {
    // Notice how each input has a `value`, `name`, and `onChange` prop
    return (
      <PageContainer>
       {this.state.name?  <Header text={this.state.name} align='center' /> : <Header text={'Add new Course!'} />}
    
        {/* <form className="form container"> */}
        <div className='input-field'>
          <label htmlFor="courseName">
              Course Name: 
          </label>
            <input
              value={this.state.name}
              name="name"
              onChange={this.handleInputChange}
              id="courseName"
              type="text"
            />
        </div>
          
     
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
              Number of Spots Available: 
          </label>
              <input
            value={this.state.numberOfSeats}
            name="numberOfSeats"
            type="number" 
            // min="0"
            // max="25"
            onChange={this.handleInputChange}
          />  <label>Start Time:</label>
      
          <input type="text"  
          name="starttime" 
          value={this.state.startTime} 
          onChange={(ev) => {this.setState({startTime:ev.target.value})}}
         pattern ={/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/}
        required />

           <label> 
            End Time:
        </label>
         <input
            value={this.state.endTime}
            name="endtime"
            onChange={(ev) => {this.setState({endTime:ev.target.value})}}
            type="text"
            
          />
          
          <label> Start Date:</label>  
          <input type="text" id='startDatePicker' className="datepicker" 
            // onChange={this.handleDateChange} 
          />
          
          <label> End Date:</label>  
          <input type="text" id='endDatePicker' className="datepicker" 
          //  onChange={this.handleDateChange}
            />
       
         
        {/* </form> */}

        <SelectInstructor onChange={this.getSelectedInstructors} />
        <SelectStudent onChange={this.getSelectedStudents} />
        {/* <form> */}
        {/* <button onClick={this.handleFormSubmit}>Submit</button> */}
        <div id="newCourseSubmit"><Submit submitFunction={this.handleFormSubmit}/></div>
        {/* </form> */}
      </PageContainer>
    );
  }
}

export default Newcourse;



