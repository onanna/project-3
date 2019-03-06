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
      phone: "",

      addExistStuNotice:'',
      addExistInstNotice:'',
      addNewStuNotice:'',
      addNewInsNotice:'',  

      firstInstructorName: "",
      lastInstructorName: "",
      emailInstructor: "",
      phoneInstructor: ''

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
  

  this.handleFirstNameChangeinst=(e)=> {
    e.preventDefault();
    this.setState({
      firstInstructorName: e.target.value
    });
  }

  this.handleLastNameChangeinst=(e)=>{
    e.preventDefault();
    this.setState({
      lastInstructorName:e.target.value
    });
  }

  this.handleEmailChangestuinst=(e)=>{
    e.preventDefault();
    this.setState({
      emailInstructor:e.target.value
    });
  }

  this.handlePhoneChangestuinst=(e)=>{
    e.preventDefault();
    this.setState({
      phoneInstructor:e.target.value
    });
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
    alert(JSON.stringify(newInstructor));

    // API.addInstructor(newInstructor)
  }

  //----------------------------------------------------------------------------------------------

  this.handleFirstNameChange=(e)=> {
    e.preventDefault();
    this.setState({
      firstName: e.target.value,
    });
  }

  this.handleLastNameChange=(e)=>{
    e.preventDefault();
    this.setState({
      lastName: e.target.value,
    });
  }

  this.handleEmailChange=(e)=>{
    e.preventDefault();
    this.setState({
      email: e.target.value,
    });
  }

  this.handlePhoneChange=(e)=>{
    e.preventDefault();
    this.setState({
      phone: e.target.value,
    });
  }

  this.handleOnSubmit =(e)=> {
    $('.forColorClear').css('color','#9e9e9e')
    this.setState({addNewStuNotice:''})
    e.preventDefault();
    console.log("submit");
    
    let isError=false
    let newError='';
    if(this.state.firstName.trim().length===0){
      $('#stuFirstName').css('color','#ff5252')
      isError=true;      
    }
    if(this.state.lastName.trim().length===0){
      $('#stuLastName').css('color','#ff5252')
      isError=true;       
    }
    if(this.state.email.trim().length===0){
      $('#stuEmail').css('color','#ff5252')
      isError=true;       
    }
    if(this.state.phone.trim().length===0){
      $('#stuPhone').css('color','#ff5252')
      isError=true;       
    }

    if(isError){
      this.setState((prevState)=>({
        addNewStuNotice:'Missing Fields'
      }))
    }

    var newStudent = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      phone: this.state.phone
    };
  }
  //--------------------------------------------------------------------------------------------------------------

  this.selectStudentChange=(currentList)=>{
      if(currentList.length<1){
        $('#existStudentSubmit').css('display','none');
      }else{
        $('#existStudentSubmit').css('display','inherit')
      }
    
    this.setState((prev)=>({
      studentsToAdd:currentList
    }))
  }
  
  this.selectInstructorChange=(currentList)=>{
    if(currentList.length<1){
      $('#existInstructSubmit').css('display','none');
    }else{
      $('#existInstructSubmit').css('display','inherit')
    }
    this.setState((prev)=>({
      instructorsToAdd:currentList
    }))
  }
  
  this.addToRoster=(roster,optionalData)=>{

    let whoToAdd;
    let data;
    switch(roster){
      case 'students':
        whoToAdd=this.state.studentsToAdd;
        data=[];
        whoToAdd.forEach((current,i)=>{
          data.push(current.value)
        })
        if(data.length<1) return;
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
        if(data.length<1) return;
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
                            <i class="material-icons prefix forColorClear" id='stuFirstName'>account_circle</i>
                            <input
                              id="fName"
                              type="text"
                              placeholder="First Name"
                              onChange={this.handleFirstNameChange}
                            />
                          </div>

                          <div class="input-field col s6">
                            <i class="material-icons prefix forColorClear"id='stuLastName'>account_circle</i>
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
                            <i class="material-icons prefix forColorClear"id='stuEmail'>email</i>
                            <input
                              id="email"
                              type="text"
                              placeholder="Email"
                              onChange={this.handleEmailChange}
                            />
                          </div>

                          <div class="input-field col s6">
                            <i class="material-icons prefix forColorClear"id='stuPhone'>phone</i>
                            <input
                              id="phone"
                              type="text"
                              placeholder="Phone"
                              onChange={this.handlePhoneChange}
                            />
                          </div>
                        </div>
                          <div>{this.state.addNewStuNotice.length>0?this.state.addNewStuNotice:''}</div>
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
                            <i class="material-icons prefix forColorClear">account_circle</i>
                            <input
                              id="fName"
                              type="text"
                              placeholder="First Name"
                              onChange={this.handleFirstNameChangeinst}
                            />
                          </div>

                          <div class="input-field col s6">
                            <i class="material-icons prefix forColorClear">account_circle</i>
                            <input
                              id="lName"
                              type="text"
                              placeholder="Last Name"
                              onChange={this.handleLastNameChangeinst}
                            />
                          </div>
                        </div>

                        <div class="row">
                          <div class="input-field col s6">
                            <i class="material-icons prefix forColorClear">email</i>
                            <input
                              id="email"
                              type="text"
                              placeholder="Email"
                              onChange={this.handleEmailChangestuinst}
                            />
                          </div>

                          <div class="input-field col s6">
                            <i class="material-icons prefix forColorClear">phone</i>
                            <input
                              id="phone"
                              type="text"
                              placeholder="Phone"
                              onChange={this.handlePhoneChangestuinst}
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
