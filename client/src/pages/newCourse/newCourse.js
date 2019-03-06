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
      error:'',
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
  
    this.onChange = time => this.setState({ time })

  
    this.handleFormSubmit = event => {
      // Preventing the default behavior of the form submit (which is to refresh the page)
      event.preventDefault();
      $('.forColorClear').css('color','#9e9e9e')

      let startdateChosen = document.getElementById("startDatePicker").value
      let enddateChosen = document.getElementById("endDatePicker").value
      console.log(startdateChosen)

      // let startdateChosen = x.value;
      // let enddateChosen = y.value;

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

      let isError = false;
      if(dataToSend.name.trim().length===0){
        $('#courseNameLabel').css('color','#ff5252')
        isError=true;
      }
      if(dataToSend.numberOfSeats.trim().length===0){
        $('#numSeatsLabel').css('color','#ff5252')
        isError=true;
      }else{
          //check that it's a number
        }
      if(dataToSend.startDate.trim().length===0){
        $('#startDateLabel').css('color','#ff5252')
        isError=true;      
      }
      if(dataToSend.endDate.trim().length===0){
        $('#endDateLabel').css('color','#ff5252')
        isError=true;      
      }
      if(dataToSend.startTime.trim().length===0){
        $('#startTimeLabel').css('color','#ff5252')
        isError=true;      
      }
      if(dataToSend.endTime.trim().length===0){
        $('#endTimeLabel').css('color','#ff5252')
        isError=true;      
      }
      if(dataToSend.location.trim().length===0){
        $('#locationLabel').css('color','#ff5252')
        isError=true;      
      }
    
      if(isError){
        this.setState((prevState)=>({
          error:'All Fields Are Required'
        }))
      }else{
        API.addCourse(dataToSend)
        .then(result=>{
          if(result.data._id){
            window.location.href = "/";
          }else{
            $('#courseNameLabel').css('color','#ff5252')
            this.setState((prevState)=>({
              error:'A course with this name already exists'
            }))
          }
        })
        .catch(error=>{
          console.log('ERROR '+JSON.stringify(error))
        })
      }

    };

  }

  render() {
    // Notice how each input has a `value`, `name`, and `onChange` prop
    return (
      <PageContainer>
       {this.state.name?  <Header text={this.state.name} align='center' /> : <Header text={'Add new Course!'} />}
    
        {/* <form className="form container"> */}
        <div className='input-field'>
          <label className='forColorClear' id='courseNameLabel'htmlFor="courseName">
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
          
        <div className='input-field'>     
            <label className='forColorClear' id='locationLabel'htmlFor="location"> 
                Location:
            </label>
            <input
              value={this.state.location}
              name="location"
              onChange={this.handleInputChange}
              type="text"
              id='location'
            />
        </div>

        <div className='input-field'>     
          <label className='forColorClear' id='numSeatsLabel'htmlFor="numSeats">
              Number of Spots Available: 
          </label>
          <input
            value={this.state.numberOfSeats}
            name="numberOfSeats"
            type="number"
            id='numSeats'
            onChange={this.handleInputChange}
          />  
        </div>
          
        <div className='input-field'>     
          <label className='forColorClear' id='startTimeLabel' htmlFor='startTime'>Start Time:</label>
          <input type="text"  
          name="starttime" 
          value={this.state.startTime}
          id='startTime'
          onChange={(ev) => {this.setState({startTime:ev.target.value})}}
         pattern ={/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/}
        required />
        </div>

        <div className='input-field'>     
           <label className='forColorClear' id='endTimeLabel' htmlFor='endTime'> 
            End Time:
          </label>
          <input
              value={this.state.endTime}
              name="endtime"
              onChange={(ev) => {this.setState({endTime:ev.target.value})}}
              type="text"
              id='endTime'
          />
        </div>
          
        <div className='input-field'>     
          <label className='forColorClear' id='startDateLabel' htmlFor='startDatePicker'> Start Date:</label>  
          <input type="text" id='startDatePicker' className="datepicker"/>
        </div>
          
        <div className='input-field'>     
          <label className='forColorClear' id='endDateLabel' htmlFor='endDatePicker'> End Date:</label>  
          <input type="text" id='endDatePicker' className="datepicker"/>
        </div>

        <SelectInstructor onChange={this.getSelectedInstructors} />
        <SelectStudent onChange={this.getSelectedStudents} />

        {this.state.error.length>0? <p className='newCourseError center-align'>{this.state.error}</p> : <div></div>}
        <div id="newCourseSubmit"><Submit submitFunction={this.handleFormSubmit}/></div>
      </PageContainer>
    );
  }
}

export default Newcourse;



