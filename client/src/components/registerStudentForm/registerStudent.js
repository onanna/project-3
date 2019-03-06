import React, { Component } from "react";
import axios from "axios";
import "./../registerStudentForm/registerStudent.css";
import API from "../../utils/API";
import Submit from '../../components/submitButton/index'
import InstructorSelect from "../../components/selectInstructors/selectInstructors";
import StudentSelect from "../../components/selectStudents/selectStudents";

const $ = window.$;

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      studentsToAdd: [],
      instructorsToAdd: [],
      firstName: "",
      lastName: "",
      email: "",
      // phone: "",
      addExistStuNotice:'',
      addExistInstNotice:'',
      addNewStuNotice:'',
      addNewInsNotice:'',  
      phone: 0,
      firstInstructorName: "",
      lastInstructorName: "",
      emailInstructor: "",
      phoneInstructor: 0

    };

    // this.handleFirstNameChange = this.handleFirstNameChange.bind(this);

    // this.handleLastNameChange = this.handleLastNameChange.bind(this);

    // this.handleEmailChange = this.handleEmailChange.bind(this);

    // this.handlePhoneChange = this.handlePhoneChange.bind(this);

    // this.handleOnSubmit = this.handleOnSubmit.bind(this);

    this.componentDidMount = () => {
      $(".collapsible").collapsible();
      this.getAllStudents();
    };

    this.getAllStudents = () => {
      API.getAllStudents()
        .then(res => {
          this.setState({ students: res.data });
          console.log(JSON.stringify(res.data));
        })
        .catch(err => console.log(err));
    };
  

  this.handleFirstNameChange=(e)=> {
    e.preventDefault();
    this.setState({
      firstName: e.target.value,
      firstInstructorName: e.target.value
    });
    // console.log(this.state.firstName);
    // console.log(this.state.firstInstructorName);

  }

  this.handleLastNameChange=(e)=>{
    e.preventDefault();
    this.setState({
      lastName: e.target.value,
      lastInstructorName:e.target.value
    });
    // console.log(this.state.lastName);
    // console.log(this.state.lastInstructorName);
  }

  this.handleEmailChange=(e)=>{
    e.preventDefault();
    this.setState({
      email: e.target.value,
      emailInstructor:e.target.value
    });
    // console.log(this.state.email);
    // console.log(this.state.emailInstructor);
  }

  this.handlePhoneChange=(e)=>{
    e.preventDefault();
    this.setState({
      phone: e.target.value,
      phoneInstructor:e.target.value
    });
    // console.log(this.state.phone);
    // console.log(this.state.phoneInstructor);
    
  }

  this.handleOnSubmit =(e)=> {
    e.preventDefault();
    console.log("submit");
    //console.log(e.target.value)
    var newStudent = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      phone: this.state.phone
    };
    console.log(newStudent);
    // API.addStudent(newStudent)

    //make an axios.post method
    //axios.post('localhost:3001/api/students', newStudent)

    // let isError = false;
    //   if(dataToSend.name.trim().length===0){
    //     $('#courseNameLabel').css('color','#ff5252')
    //     isError=true;
    //   }
    //   if(dataToSend.numberOfSeats.trim().length===0){
    //     $('#numSeatsLabel').css('color','#ff5252')
    //     isError=true;
    //   }else{
    //       //check that it's a number
    //     }
    //   if(dataToSend.startDate.trim().length===0){
    //     $('#startDateLabel').css('color','#ff5252')
    //     isError=true;      
    //   }
    //   if(dataToSend.endDate.trim().length===0){
    //     $('#endDateLabel').css('color','#ff5252')
    //     isError=true;      
    //   }
    //   if(dataToSend.startTime.trim().length===0){
    //     $('#startTimeLabel').css('color','#ff5252')
    //     isError=true;      
    //   }
    //   if(dataToSend.endTime.trim().length===0){
    //     $('#endTimeLabel').css('color','#ff5252')
    //     isError=true;      
    //   }
    //   if(dataToSend.location.trim().length===0){
    //     $('#locationLabel').css('color','#ff5252')
    //     isError=true;      
    //   }
    
    //   if(isError){
    //     this.setState((prevState)=>({
    //       error:'All Fields Are Required'
    //     }))
    //   }else{
    //     API.addCourse(dataToSend)
    //     .then(result=>{
    //       if(result.data._id){
    //         window.location.href = "/";
    //       }else{
    //         $('#courseNameLabel').css('color','#ff5252')
    //         this.setState((prevState)=>({
    //           error:'A course with this name already exists'
    //         }))
    //       }
    //     })
    //     .catch(error=>{
    //       console.log('ERROR '+JSON.stringify(error))
    //     })
    //   }
  }

  selectStudentChange=(currentList)=>{
    this.setState((prev)=>({
      studentsToAdd:currentList
    }))
  }
    
  selectInstructorChange=(currentList)=>{
    this.setState((prev)=>({
      instructorsToAdd:currentList
    }))
  }
  
  addToRoster=(roster,optionalData)=>{
    let whoToAdd;
    let data;
    switch(roster){
      case 'students':
        whoToAdd=this.state.studentsToAdd;
        data=[];
        whoToAdd.forEach((current,i)=>{
          data.push(current.value)
        })
        API.addStudentsToCourse(this.props.courseId,data)
        .then(result=>{
          if(result.data.success){
            this.setState((prev)=>({
              addExistStuNotice: data.length===1? `Student Added Successfully!` : 'Students Added Successfully!'
            }))
            this.props.updateCourseStudents(result.data.success.students)
            setTimeout(()=>{
              this.setState((prev)=>({
                studentsToAdd: [],
                addExistStuNotice:''
              }))
            },1500)
          }
        })
        .catch(error=>{
          alert('error '+JSON.stringify(error))
        })
      break;

      case 'instructors':
        whoToAdd=this.state.instructorsToAdd;
        data=[];
        whoToAdd.forEach((current,i)=>{
          data.push(current.value)
        })
        API.addInstructorsToCourse(this.props.courseId,data)
        .then(result=>{
          if(result.data.success){
            this.setState((prev)=>({
              addExistInstNotice: data.length===1? `Instructor Added Successfully!` : 'Instructors Added Successfully!'
            }))
            this.props.updateCourseInstructors(result.data.success.instructors)
            setTimeout(()=>{
              this.setState((prev)=>({
                InstructorsToAdd: [],
                addExistInstNotice:''
              }))
            },1500)
          }
        })
        .catch(error=>{
          alert('error '+JSON.stringify(error))
        })
      break;
    }
  }

  this.handleInstructorOnSubmit =(e) => {
    e.preventDefault();
    var newInstructor={
      firstName: this.state.firstInstructorName,
      lastName: this.state.lastInstructorName,
      email: this.state.emailInstructor,
      phone: this.state.phoneInstructor
    }
    // console.log(newInstructor)
    API.addInstructor(newInstructor)
  }
  }
  render() {
    return (
      <div>
        {/* Add Student Collapsible */}  
        <div className="row" id="collapDiv">
          <div className="col s12 m6">
            <ul className="collapsible expandable">
              <li>
                <div className="collapsible-header" id="header1">
                  <i className="material-icons">person_add</i>Existing Student(s)
                </div>

                <div className="collapsible-body">
                  <span>
                    <StudentSelect onChange={this.selectStudentChange} />
                    <div id="existStudentSubmit"><Submit submitFunction={()=>this.addToRoster('students')}/></div>
                    <div>{this.state.addExistStuNotice.length>0?this.state.addExistStuNotice:''}</div>
                  </span>
                </div>
         
              </li>

              <li>
                <div className="collapsible-header" id="header2">
                  <i className="material-icons">person_add</i>New Student
                </div>

                <div className="collapsible-body">
                  <span>
                    <div class="row">
                      <form class="col s12" onSubmit={this.handleOnSubmit}>
                        <div class="row">
                          <div class="input-field col s6">
                            <i class="material-icons prefix">account_circle</i>
                            <input
                              id="fName"
                              type="text"
                              placeholder="First Name"
                              onChange={this.handleFirstNameChange}
                            />
                          </div>

                          <div class="input-field col s6">
                            <i class="material-icons prefix">account_circle</i>
                            <input
                              id="lName"
                              type="text"
                              placeholder="Last Name"
                              onChange={this.handleLastNameChange}
                            />
                          </div>
                        </div>

                        <div class="row">
                          <div class="input-field col s6">
                            <i class="material-icons prefix">email</i>
                            <input
                              id="email"
                              type="text"
                              placeholder="Email"
                              onChange={this.handleEmailChange}
                            />
                          </div>

                          <div class="input-field col s6">
                            <i class="material-icons prefix">phone</i>
                            <input
                              id="phone"
                              type="text"
                              placeholder="Phone"
                              onChange={this.handlePhoneChange}
                            />
                          </div>
                        </div>
                        <div id="newStudentSubmit"><Submit submitFunction={this.handleFormSubmit}/></div>
                      </form>
                    </div>
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>


        {/* Add Instructor Collapsible */}
        <div className="row" id="collapDiv">
          <div className="col s12 m6">
            <ul className="collapsible expandable">
              <li>
                <div className="collapsible-header" id="header1">
                  <i className="material-icons">person_add</i>Existing Instructor(s)
                </div>

                <div className="collapsible-body">
                  <span>
                    <InstructorSelect onChange={this.selectInstructorChange} />
                    <div id="existInstructSubmit"><Submit submitFunction={()=>this.addToRoster('instructors')}/></div>
                    <div>{this.state.addExistInstNotice.length>0?this.state.addExistInstNotice:''}</div>
                  </span>
                </div>
              </li>

              <li>
                <div className="collapsible-header" id="header2">
                  <i className="material-icons">person_add</i>New Instructor
                </div>

                <div className="collapsible-body">
                  <span>
                    <div class="row">
                      <form class="col s12" onSubmit={this.handleOnSubmit}>
                        <div class="row">
                          <div class="input-field col s6">
                            <i class="material-icons prefix">account_circle</i>
                            <input
                              id="fName"
                              type="text"
                              placeholder="First Name"
                              value={this.state.firstInstructorName}

                              onChange={this.handleFirstNameChange}
                            />
                          </div>

                          <div class="input-field col s6">
                            <i class="material-icons prefix">account_circle</i>
                            <input
                              id="lName"
                              type="text"
                              placeholder="Last Name"
                              value={this.state.lastInstructorName}
                              onChange={this.handleLastNameChange}
                            />
                          </div>
                        </div>

                        <div class="row">
                          <div class="input-field col s6">
                            <i class="material-icons prefix">email</i>
                            <input
                              id="email"
                              type="text"
                              placeholder="Email"
                              value={this.state.emailInstructor}
                              onChange={this.handleEmailChange}
                            />
                          </div>

                          <div class="input-field col s6">
                            <i class="material-icons prefix">phone</i>
                            <input
                              id="phone"
                              type="text"
                              placeholder="Phone"
                              value={this.state.phoneInstructor}
                              onChange={this.handlePhoneChange}
                            />
                          </div>
                        </div>
                        <div id="newInstructSubmit"><Submit submitFunction={this.handleInstructorOnSubmit}/></div>
                      </form>
                    </div>
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
