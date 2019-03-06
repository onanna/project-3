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
      students: [],
      firstName: "",
      lastName: "",
      email: "",
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
      $("select").formSelect();
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
    //make an axios.post method
    //axios.post('localhost:3001/api/students', newStudent)
    API.addStudent(newStudent)

   
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
                  <i className="material-icons">person_add</i>Existing Student
                </div>

                <div className="collapsible-body">
                  <span>
                    <StudentSelect onChange={this.getSelectedStudents} />

                    <div id="existStudentSubmit"><Submit submitFunction={this.handleFormSubmit}/></div>
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
                  <i className="material-icons">person_add</i>Existing Instructor
                </div>

                <div className="collapsible-body">
                  <span>
                    <InstructorSelect onChange={this.getSelectedInstructors} />

                    <div id="existInstructSubmit"><Submit submitFunction={this.handleFormSubmit}/></div>
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
