import React, { Component } from "react";
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

    this.componentDidMount = () => {
      $(".collapsible").collapsible();
      this.getAllStudents();
    };

    this.getAllStudents = () => {
      API.getAllStudents()
        .then(res => {
          this.setState({ students: res.data });
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
    $('.forColorClear').css('color','#9e9e9e')
    this.setState({addNewInsNotice:''})
    
    let isError=false
    let newError='';
    if(this.state.firstInstructorName.trim().length===0){
      $('#insFirstName').css('color','#ff5252')
      isError=true;
      newError='All Fields are Required'
    }
    if(this.state.lastInstructorName.trim().length===0){
      $('#insLastName').css('color','#ff5252')
      isError=true;
      newError='All Fields are Required'
    }
    if(this.state.phoneInstructor.trim().length===0){
      $('#insPhone').css('color','#ff5252')
      isError=true;
      newError='All Fields are Required'
    }else{
      let validPhone =/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/.test(this.state.phoneInstructor)
      if(!validPhone){
        $('#insPhone').css('color','#ff5252')
        isError=true;        
        newError='Invalid Phone'
      }
    }
    if(this.state.emailInstructor.trim().length===0){
      $('#insEmail').css('color','#ff5252')
      isError=true;
      newError='All Fields are Required'
    }else{
      let isValidEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.emailInstructor);
        if(!isValidEmail){
          $('#insEmail').css('color','#ff5252')
          isError=true;        
          newError='Invalid Email'
        }
    }

    if(isError){
      this.setState((prevState)=>({
        addNewInsNotice:newError
      }))
    }else{
      var newInstructor = {
        firstName: this.state.firstInstructorName,
        lastName: this.state.lastInstructorName,
        email: this.state.emailInstructor,
        phone: this.state.phoneInstructor
      };

      API.newInstAndAdd(this.props.courseId,newInstructor)
        .then(result=>{
          if(result.data.success){
            this.setState((prev)=>({
              addNewInsNotice: `Instructor Added Successfully!`,
              firstInstructorName: "",
              lastInstructorName: "",
              emailInstructor: "",
              phoneInstructor: "",
            }))
            this.props.updateCourseInstructors(result.data.success.instructors)
            setTimeout(()=>{
              this.setState((prev)=>({
                addNewInsNotice:''
              }))
            },1500)
          } 
          if(result.data.error) this.setState({addNewInsNotice:result.data.error})
        })

    }
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
    
    let isError=false
    let newError='';
    if(this.state.firstName.trim().length===0){
      $('#stuFirstName').css('color','#ff5252')
      isError=true;
      newError='All Fields are Required'
    }
    if(this.state.lastName.trim().length===0){
      $('#stuLastName').css('color','#ff5252')
      isError=true;
      newError='All Fields are Required'
    }
    if(this.state.phone.trim().length===0){
      $('#stuPhone').css('color','#ff5252')
      isError=true;
      newError='All Fields are Required'
    }else{
      let validPhone =/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/.test(this.state.phone)
      if(!validPhone){
        $('#stuPhone').css('color','#ff5252')
        isError=true;        
        newError='Invalid Phone'
      }
    }
    if(this.state.email.trim().length===0){
      $('#stuEmail').css('color','#ff5252')
      isError=true;
      newError='All Fields are Required'
    }else{
      let isValidEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email);
        if(!isValidEmail){
          $('#stuEmail').css('color','#ff5252')
          isError=true;        
          newError='Invalid Email'
        }
    }

    if(isError){
      this.setState((prevState)=>({
        addNewStuNotice:newError
      }))
    }else{
      var newStudent = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        phone: this.state.phone
      };

      // alert('adding '+JSON.stringify(newStudent)+' to '+this.props.courseId)

      API.newStuAndAdd(this.props.courseId,newStudent)
        .then(result=>{
          if(result.data.success){
            this.setState((prev)=>({
              addNewStuNotice: `Student Added Successfully!`,
              firstName: "",
              lastName: "",
              email: "",
              phone: "",
            }))
            this.props.updateCourseStudents(result.data.success.students)
            setTimeout(()=>{
              this.setState((prev)=>({
                addNewStuNotice:''
              }))
            },1500)
          } 
          if(result.data.error) this.setState({addNewStuNotice:result.data.error})
        })

    }

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
              addExistStuNotice: data.length===1? `Student Added Successfully!` : 'Students Added Successfully!',
            }))
            this.props.updateCourseStudents(result.data.success.students)
            setTimeout(()=>{
              this.setState((prev)=>({
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
              addExistInstNotice: data.length===1? `Instructor Added Successfully!` : 'Instructors Added Successfully!',
            }))
            this.props.updateCourseInstructors(result.data.success.instructors)
            setTimeout(()=>{
              this.setState((prev)=>({
                addExistInstNotice:''
              }))
            },1500)
          }
        })
        .catch(error=>{
          alert('error '+JSON.stringify(error))
        })
      break;

      default:
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
                      <div>
                        {
                          this.state.addExistStuNotice.length>0?
                              this.state.addExistStuNotice.includes('Added')?
                                <p className='successMessage'>{this.state.addExistStuNotice}</p>
                                :
                                <p className='errorMessage'>{this.state.addExistStuNotice}</p>
                            :
                            ''
                          }
                    </div>
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
                            <i className="material-icons prefix forColorClear" id='stuFirstName'>account_circle</i>
                            <input
                              id="fName"
                              type="text"
                              placeholder="First Name"
                              value={this.state.firstName}
                              onChange={this.handleFirstNameChange}
                            />
                          </div>

                          <div className="input-field col s6">
                            <i className="material-icons prefix forColorClear"id='stuLastName'>account_circle</i>
                            <input
                              id="lName"
                              type="text"
                              placeholder="Last Name"
                              value={this.state.lastName}
                              onChange={this.handleLastNameChange}
                            />
                          </div>
                        </div>

                        <div className="row">
                          <div className="input-field col s6">
                            <i className="material-icons prefix forColorClear"id='stuEmail'>email</i>
                            <input
                              id="email"
                              type="text"
                              placeholder="Email"
                              value={this.state.email}
                              onChange={this.handleEmailChange}
                            />
                          </div>

                          <div className="input-field col s6">
                            <i className="material-icons prefix forColorClear"id='stuPhone'>phone</i>
                            <input
                              id="phone"
                              type="text"
                              placeholder="Phone"
                              value={this.state.phone}
                              onChange={this.handlePhoneChange}
                            />
                          </div>
                        </div>
                          <div>{this.state.addNewStuNotice.length>0?
                            this.state.addNewStuNotice.includes('Added')?
                              <p className='successMessage'>{this.state.addNewStuNotice}</p>
                              :
                              <p className='errorMessage'>{this.state.addNewStuNotice}</p>
                          :
                          ''
                        }</div>
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
                    <div>
                      {
                        this.state.addExistInstNotice.length>0?
                          this.state.addExistInstNotice.includes('Added')?
                            <p className='successMessage'>{this.state.addExistInstNotice}</p>
                            :
                            <p className='errorMessage'>{this.state.addExistInstNotice}</p>
                        :
                        ''
                      }
                    </div>
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
                            <i id='insFirstName'className="material-icons prefix forColorClear">account_circle</i>
                            <input
                              id="fName"
                              type="text"
                              placeholder="First Name"
                              value={this.state.firstInstructorName}
                              onChange={this.handleFirstNameChangeinst}
                            />
                          </div>

                          <div className="input-field col s6">
                            <i id='insLastName'className="material-icons prefix forColorClear">account_circle</i>
                            <input
                              id="lName"
                              type="text"
                              placeholder="Last Name"
                              value={this.state.lastInstructorName}
                              onChange={this.handleLastNameChangeinst}
                            />
                          </div>
                        </div>

                        <div className="row">
                          <div className="input-field col s6">
                            <i id='insEmail'className="material-icons prefix forColorClear">email</i>
                            <input
                              id="email"
                              type="text"
                              placeholder="Email"
                              value={this.state.emailInstructor}
                              onChange={this.handleEmailChangestuinst}
                            />
                          </div>

                          <div className="input-field col s6">
                            <i id='insPhone'className="material-icons prefix forColorClear">phone</i>
                            <input
                              id="phone"
                              type="text"
                              placeholder="Phone"
                              value={this.state.phoneInstructor}
                              onChange={this.handlePhoneChangestuinst}
                            />
                          </div>
                        </div>
                        <div>{this.state.addNewInsNotice.length>0?
                            this.state.addNewInsNotice.includes('Added')?
                              <p className='successMessage'>{this.state.addNewInsNotice}</p>
                              :
                              <p className='errorMessage'>{this.state.addNewInsNotice}</p>
                          :
                          ''
                        }</div>
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
