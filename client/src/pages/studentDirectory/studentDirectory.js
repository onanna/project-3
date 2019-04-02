import React, { Component } from "react";
import {Link} from 'react-router-dom';
import Pagecontainer from "../../components/pageContainer/index"
import API from "../../utils/API"
import learningImg from '../../images/learning.jpg';
import SkyImg from '../../images/skyBanner.jpg'
import Submit from '../../components/submitButton/index'
import './style.css';
const $ = window.$;

class Home extends Component{
    state={
        students:[],
        addingNew:false,
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        addNewStuNotice:'',
    }

    componentDidMount(){
        this.getAllStudents();
    }

    addStudent=(studentToAdd)=>{
        API.addStudent(studentToAdd)
            .then(this.getAllStudents())
    }
    updateStudent=(idOfStudentToUpdate,whatToChange,newValue)=>{
        API.updateStudent(idOfStudentToUpdate,whatToChange,newValue)
            .then(this.getAllStudents())
            .catch(err => console.log(err));
    }
    // getAStudent=(indexOfStudentToGet)=>{
    //   alert( JSON.stringify( this.state.students[indexOfStudentToGet]))
    //   let chosen=this.state.students[indexOfStudentToGet];
    // }
    getAllStudents=()=>{
        API.getAllStudents()
            .then(res => this.setState({ students: res.data }))
            .catch(err => console.log(err));
    }
    deleteStudent=(idToDelete)=>{
        API.deleteStudent(idToDelete)
            .then(this.getAllStudents());
    }
   
    toggleAdd=()=>{
        this.state.addingNew?
            this.setState((prev)=>({
                addNewStuNotice:'',
                addingNew:false
            }))
        :
        this.setState((prev)=>({
            addingNew:true
        }))
    }

    handleFirstNameChange=(e)=> {
        e.preventDefault();
        this.setState({
            firstName: e.target.value,
        });
    }
    
    handleLastNameChange=(e)=>{
        e.preventDefault();
        this.setState({
          lastName: e.target.value,
        });
    }
    
    handleEmailChange=(e)=>{
        e.preventDefault();
        this.setState({
            email: e.target.value,
        });
    }
    
    handlePhoneChange=(e)=>{
        e.preventDefault();
        this.setState({
            phone: e.target.value,
        });
    }
    
    handleOnSubmit =(e)=> {
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

        API.addStudent(newStudent)
        .then(result=>{
            if(result.data.success){
            this.setState((prev)=>({
                addNewStuNotice: `Student Added Successfully!`,
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
            }))
            let currentStudents=this.state.students
            currentStudents.push(result.data.new)
            setTimeout(()=>{
                this.setState((prev)=>({
                    addingNew:false,
                    students:currentStudents,
                    addNewStuNotice:''
                }))
            },1500)
            } 
            if(result.data.error) this.setState({addNewStuNotice:result.data.error})
        })

    }

    }

    render(){
        return(
            <Pagecontainer>
                <div id='studentImgRow' className="row">
                    <div className="card hoverable">
                        <div className="card-image">
                            {/* <img src={learningImg} alt="learning" /> */}
                            <img src={SkyImg} />
                            <span className='card-title'>Students</span>
                        </div>
                    <a id='LightBlue'onClick={this.toggleAdd} className="btn btn-large btn-floating halfway-fab"><i className="material-icons">add</i></a>
                    </div>
                </div>
                 
                {
                    this.state.students.length>0 || this.state.addingNew===true?
                    
                    <div className="row">
                        <div id='students' className="card">
                            <div className='card-content'>

                                {
                                    this.state.addingNew===false?

                                    <div className="col s12 ">  
                                        {this.state.students.map((current,i)=>{
                                            return (
                                                <ul  key={i}>
                                                    <li><b>Name: </b>{`${current.firstName} ${current.lastName}`}</li>
                                                    <li><b>Email: </b>{current.email}</li>
                                                    <li><b>Phone Number: </b>{current.phone}</li>
                                                    <li> <b>Currently Enrolled:</b> 
                                                        <ul>
                                                            {current.currentlyEnrolled.map((current,i)=>{
                                                                return(
                                                                    <li key={i}><Link target='_blank' rel="noopener noreferrer"  to={`/courses/detail/${current._id}`}>{current.name}</Link></li>
                                                                )
                                                            })}
                                                        </ul>
                                                    </li>
                                                    <hr></hr>
                                                </ul>
                                            )
                                        })
                                        }
                                    </div>
                                    :
                                    <div>
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
                                            <div className='center-align errorRow'>{this.state.addNewStuNotice.length>0?
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
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                    :
                    <div></div>
                }
            </Pagecontainer>
        )
    }
}

export default Home;