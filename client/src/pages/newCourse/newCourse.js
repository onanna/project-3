import React, { Component } from "react";
import "./style.css";
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
      let instructorsSelected =[]
      selected.forEach((element,i) => {
          instructorsSelected.push(element.value)
      });
      this.setState({
          instructors:instructorsSelected
      })
    }

    this.getSelectedStudents=(selected)=>{
        let studentsSelected =[]
        selected.forEach((element,i) => {
            studentsSelected.push(element.value)
        });
        this.setState({
            students:studentsSelected
        })
    }

    this.componentDidMount=()=>{
      $(".datepicker").datepicker({
        format: "mm-dd-yyyy",
        autoClose: true
      });
      $('.timepicker').timepicker({
        autoClose: true
      })
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
      let startTimeChosen = document.getElementById("startTime").value
      let endTimeChosen = document.getElementById("endTime").value

      // let startdateChosen = x.value;
      // let enddateChosen = y.value;

      let dataToSend={
        user:this.props.user,
        name: this.state.name,
        numberOfSeats: this.state.numberOfSeats,
        startDate: startdateChosen,
        endDate: enddateChosen,
        startTime: startTimeChosen,
        endTime: endTimeChosen,
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
        API.addCourse(dataToSend, this.props.user)
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
       {this.state.name?  <Header text={this.state.name} align='center' /> : <Header text={'Add Course'} />}
    
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
          <input type="text" className="timepicker" name="starttime" id='startTime' />
        </div>

        <div className='input-field'>     
          <label className='forColorClear' id='endTimeLabel' htmlFor='endTime'>End Time:</label>
          <input type="text" id='endTime' class="timepicker"/>
        </div>
          
        <div className='input-field'>     
          <label className='forColorClear' id='startDateLabel' htmlFor='startDatePicker'> Start Date:</label>  
          <input type="text" id='startDatePicker' className="datepicker"/>
        </div>
          
        <div className='input-field'>     
          <label className='forColorClear' id='endDateLabel' htmlFor='endDatePicker'> End Date:</label>  
          <input type="text" id='endDatePicker' className="datepicker"/>
        </div>

        <SelectInstructor userId={this.props.user} onChange={this.getSelectedInstructors} />
        <SelectStudent userId={this.props.user} onChange={this.getSelectedStudents} />

        {this.state.error.length>0? <p className='newCourseError center-align'>{this.state.error}</p> : <div></div>}
        <div id="newCourseSubmit"><Submit submitFunction={this.handleFormSubmit}/></div>
      </PageContainer>
    );
  }
}

export default Newcourse;



