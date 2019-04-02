import {Link} from 'react-router-dom';
import React, { Component } from "react";
import Pagecontainer from "../../components/pageContainer/index"
import API from "../../utils/API"
import instructorImg from "../../images/instructor.gif";
import './style.css';
import Submit from '../../components/submitButton/index'
import ForestImg from '../../images/forestBanner.jpg'
const $ = window.$;



class instructors extends Component{
    state={
        instructors:[],
        addingNew:false,
        firstInstructorName: "",
        lastInstructorName: "",
        emailInstructor: "",
        phoneInstructor: '',
        addNewInsNotice:'',  
    }

    componentDidMount(){
        this.getAllInstructors();
    }

    updateInstructor=(idOfInstructorToUpdate,whatToChange,newValue)=>{
        API.updateInstructor(idOfInstructorToUpdate,whatToChange,newValue)
            .then(this.getAllInstructors())
            .catch(err => console.log(err));
    }
    
    addInstructor=(InstructorToAdd)=>{
        API.addInstructor(InstructorToAdd)
            .then(this.getAllInstructors())
    }

    getAllInstructors=()=>{
        API.getInstructors()
        .then(res => this.setState({ instructors: res.data }))
        .catch(err => console.log(err));
    }

    deleteInstructor=(idToDelete)=>{
        API.deleteInstructor(idToDelete)
        .then(this.getInstructors())
    }

    toggleAdd=()=>{
        this.state.addingNew?
            this.setState((prev)=>({
                addingNew:false
            }))
        :
        this.setState((prev)=>({
            addingNew:true
        }))
    }
    
    handleFirstNameChangeinst=(e)=> {
        e.preventDefault();
        this.setState({
            firstInstructorName: e.target.value
        });
    }
    
    handleLastNameChangeinst=(e)=>{
        e.preventDefault();
        this.setState({
            lastInstructorName:e.target.value
        });
    }
    
    handleEmailChangestuinst=(e)=>{
        e.preventDefault();
        this.setState({
          emailInstructor:e.target.value
        });
    }
    
    handlePhoneChangestuinst=(e)=>{
        e.preventDefault();
        this.setState({
          phoneInstructor:e.target.value
        });
    }
    
    handleInstructorOnSubmit =(e) => {
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
    
          API.addInstructor(newInstructor)
            .then(result=>{
              if(result.data.success){
                this.setState((prev)=>({
                  addNewInsNotice: `Instructor Added Successfully!`,
                  firstInstructorName: "",
                  lastInstructorName: "",
                  emailInstructor: "",
                  phoneInstructor: "",
                }))
                let currentInstructors=this.state.instructors
                currentInstructors.push(result.data.new)
                setTimeout(()=>{
                    this.setState((prev)=>({
                        addingNew:false,
                        instructors:currentInstructors,
                        addNewInsNotice:''
                    }))
                },1500)
              } 
              if(result.data.error) this.setState({addNewInsNotice:result.data.error})
            })
    
        }
    }

    render(){
        return(
            <Pagecontainer>
                <div id='instructorImgRow'className="row">
                    <div className="card hoverable">
                        <div className="card-image">
                            <img src={ForestImg} alt="Forest" /> 
                            <span className='card-title'>instructors</span>
                        </div>
                        <a id='LightBlue'onClick={this.toggleAdd}className="btn btn-large btn-floating halfway-fab"><i className="material-icons">add</i></a>
                    </div>
                </div>

                { 
                    this.state.instructors.length>0 || this.state.addingNew===true?
                        <div className="row">
                            <div id='instructors' className="card">
                                <div className='card-content'>

                                    {   
                                        this.state.addingNew===false? 

                                        <div className="col s12 ">  
                                            {this.state.instructors.map((current,i)=>{
                                                return (
                                                    <ul  key={i}>
                                                        <li><b>Name: </b>{`${current.firstName} ${current.lastName}`}</li>
                                                        <li><b>Email: </b>{current.email}</li>
                                                        <li><b>Phone Number: </b>{current.phone}</li>
                                                        <li> <b>Currently Teaching:</b> 
                                                            <ul>
                                                                {current.currentlyTeaching.map((current,i)=>{
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
                                                    <div className='center-align errorRow'>{this.state.addNewInsNotice.length>0?
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

export default instructors;