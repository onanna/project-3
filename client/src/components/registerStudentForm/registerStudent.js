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
      phone: ""
    };

    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);

    this.handleLastNameChange = this.handleLastNameChange.bind(this);

    this.handleEmailChange = this.handleEmailChange.bind(this);

    this.handlePhoneChange = this.handlePhoneChange.bind(this);

    this.handleOnSubmit = this.handleOnSubmit.bind(this);

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
  }

  handleFirstNameChange(e) {
    e.preventDefault();
    this.setState({
      firstName: e.target.value
    });
    console.log(this.state.firstName);
  }

  handleLastNameChange(e) {
    e.preventDefault();
    this.setState({
      lastName: e.target.value
    });
    console.log(this.state.lastName);
  }

  handleEmailChange(e) {
    e.preventDefault();
    this.setState({
      email: e.target.value
    });
    console.log(this.state.email);
  }

  handlePhoneChange(e) {
    e.preventDefault();
    this.setState({
      phone: e.target.value
    });
    console.log(this.state.phone);
  }

  handleOnSubmit(e) {
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
                    <div className="row">
                      <form className="col s12" onSubmit={this.handleOnSubmit}>
                        <div className="row">
                          <div className="input-field col s6">
                            <i className="material-icons prefix">account_circle</i>
                            <input
                              id="fName"
                              type="text"
                              placeholder="First Name"
                              onChange={this.handleFirstNameChange}
                            />
                          </div>

                          <div className="input-field col s6">
                            <i className="material-icons prefix">account_circle</i>
                            <input
                              id="lName"
                              type="text"
                              placeholder="Last Name"
                              onChange={this.handleLastNameChange}
                            />
                          </div>
                        </div>

                        <div className="row">
                          <div className="input-field col s6">
                            <i className="material-icons prefix">email</i>
                            <input
                              id="email"
                              type="text"
                              placeholder="Email"
                              onChange={this.handleEmailChange}
                            />
                          </div>

                          <div className="input-field col s6">
                            <i className="material-icons prefix">phone</i>
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
                    <div className="row">
                      <form className="col s12" onSubmit={this.handleOnSubmit}>
                        <div className="row">
                          <div className="input-field col s6">
                            <i className="material-icons prefix">account_circle</i>
                            <input
                              id="fName"
                              type="text"
                              placeholder="First Name"
                              onChange={this.handleFirstNameChange}
                            />
                          </div>

                          <div className="input-field col s6">
                            <i className="material-icons prefix">account_circle</i>
                            <input
                              id="lName"
                              type="text"
                              placeholder="Last Name"
                              onChange={this.handleLastNameChange}
                            />
                          </div>
                        </div>

                        <div className="row">
                          <div className="input-field col s6">
                            <i className="material-icons prefix">email</i>
                            <input
                              id="email"
                              type="text"
                              placeholder="Email"
                              onChange={this.handleEmailChange}
                            />
                          </div>

                          <div className="input-field col s6">
                            <i className="material-icons prefix">phone</i>
                            <input
                              id="phone"
                              type="text"
                              placeholder="Phone"
                              onChange={this.handlePhoneChange}
                            />
                          </div>
                        </div>
                        <div id="newInstructSubmit"><Submit submitFunction={this.handleFormSubmit}/></div>
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
