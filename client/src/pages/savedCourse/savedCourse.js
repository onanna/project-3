import React, { Component } from "react";
import "./../savedCourse/savedCourse.css";
import PageContainer from "../../components/pageContainer";
import Register from "../../components/registerStudentForm/registerStudent";
import API from "../../utils/API";
import H1 from "../../components/h1withDivider";
import {Card, Col} from 'react-materialize';
import Send from "../../components/sendAttendance/sendAttendance2"
import booksImg from "../../images/books1.jpg";
import InstructorSelect from '../../components/selectInstructors/selectInstructors'
import StudentSelect from '../../components/selectStudents/selectStudents'
import * as date from '../../utils/dateReaders';
const $ = window.$;


class Course extends Component {
    state={
        course:{
            instructors:[],
            attendanceRecords:[],
            students:[]
        },
        instructorsToAdd:[],
        studentsToAdd:[],
        hasBeenSent:false
    }
  
    constructor(props){
        super(props);
        
        API.getOneCourse(this.props.match.params.id)
        .then(response=> this.setState({course:response.data}))
        .catch(err => console.log("ERROR ERROR ERROR "+err))
    }

    getSelectedInstructors=(selected)=>{
        console.log(selected)
        let instructorsSelected =[]
        selected.forEach((element,i) => {
            instructorsSelected.push(element.value)
        });
        this.setState({
            instructorsToAdd:instructorsSelected
        })
        // console.log($("#instructorSelect"))
    }

    getSelectedStudents=(selected)=>{
        console.log(selected)
        let studentsSelected =[]
        selected.forEach((element,i) => {
            studentsSelected.push(element.value)
        });
        this.setState({
            studentsToAdd:studentsSelected
        })
        // console.log($("#instructorSelect"))
    }
    componentDidMount=()=>{
        $('.modal').modal();
        $('.collapsible').collapsible();
        $('.tooltipped').tooltip();
        $('ul.tabs').tabs({
            // 'swipeable': true,
            // 'responsiveThreshold' : Infinity
        });
    }


    // componentDidMount=()=>{
    //     API.getAllAttendanceFromCourse(this.state.course._id)
    //     .then(response=> console.log('all attendance records are '+ JSON.stringify(response)))
    //     .catch(err => console.log("ERROR ERROR ERROR "+err))
    // }

    render(){
        return(
            <PageContainer>
                <div className="row" id="courseCard"> 
                    <div className="col s12 m6">
                        <div className="card">
                            <div className="card-image">
                                <img src={booksImg} alt="books" /> 
                            </div>
                            <div id="registerStudent" className="modal">
                                <h4 id="modalHeader">Register Students</h4>
                                <Register />            
                            </div>                            
                            <ul id="tabs-swipe" className="tabs">
                                <li className="tab col s4"><a className="active" href="#courseContent">Course Details</a></li>
                                <li className="tab col s4"><a  href="#classRoster">Class Roster</a></li>
                                <li className="tab col s4"><a href="#test-swipe-3">Attendance</a></li>
                            </ul>

                            {/* Course Content & Student Roster in Tabs */}
                            <div id="courseContent" className="col s12 grey lighten-3 tabContent">               
                                <h4 className='bold m-top'>{this.state.course.name}</h4>  
                                <p><b> Number of Seats Available:</b> {this.state.course.numberOfSeats}</p>
                                <p><b>Start Date:</b> {this.state.course.startDate? date.readDate(this.state.course.startDate) : this.state.course.startDate}</p>
                                <p><b>End Date:</b> {this.state.course.startDate? date.readDate(this.state.course.endDate) : this.state.course.endDate}</p>
                                <p><b>Start Time:</b> {this.state.course.startTime}</p>
                                <p><b>End Time:</b> {this.state.course.endTime}</p>
                                <p><b>Location:</b> {this.state.course.location}</p>
                            </div> 

                            <div id="classRoster" className="courseTab" className="col s12 grey lighten-3 tabContent center-align">
                            {this.state.course.students.length>0 && this.state.course.instructors.length>0?
                                <div>
                                    <h4 className='bold m-top'>Class Roster</h4>
                                    
                                    <p className='flow-text rosterHeader'>Instructors</p>
                                    <ul>
                                        {this.state.course.instructors.map((current,i)=>{
                                            return(
                                                <li className='flow-text light'>{`${current.firstName} ${current.lastName}`}</li>
                                            )
                                        })}
                                    </ul>
                                    
                                    <p className='flow-text rosterHeader'>Students</p>
                                    <ul>
                                        {this.state.course.students.map((current,i)=>{
                                            return(
                                                <li className='flow-text light'>{`${current.firstName} ${current.lastName}`}</li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            :
                                <h4>Nobody Here Yet</h4>        
                            }
                                
                            </div>

                            <div id="test-swipe-3" className="courseTab" className="col s12 grey lighten-3 tabContent">

                                <h4 className='bold m-top'>Records</h4>
                                <ul className='collapsible'>
                                    {this.state.course.attendanceRecords.map((current,i)=>{
                                        return(
                                                <li>
                                                    <div className='collapsible-header flow-text'>{date.readDate(current.date)}</div>
                                                    <div className='collapsible-body'>
                                                        {current.students.map((current,i)=>{
                                                            return(
                                                                <div className='row'>
                                                                    <div className='col s6 right-align'>
                                                                        <p className='stuAttName'>{`${current.student.firstName} ${current.student.lastName}`}</p>
                                                                    </div>
                                                                    <div className='col s6 vertical-align'>
                                                                        <p>{current.inAttendance? <i className='material-icons check small'>check</i>:<i className='material-icons clear'>clear</i>}</p>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                </li>
                                        )
                                    })}
                                </ul>

                                {this.state.course.students.length>0?
                                    <div>
                                        <p className='sendToText flow-text'>Send To Instructor</p>                            
                                        <Send attendLink={`https://gentle-garden-19053.herokuapp.com/attendance/temp362019/${this.props.token}/${this.state.course._id}`} instructors={this.state.course.instructors}/>
                                        <a href={`/attendance/temp362019/${this.props.token}/${this.state.course._id}`} target="_blank">Attendance Form</a>
                                    </div>
                                :
                                    <div></div>
                                }
                            </div>
                        
                        </div>
                        
                        {/* Register Student/ Add Instructor Button */}
                        <a id='LightBlue'className="btn modal-trigger tooltipped btn-large btn-floating halfway-fab waves-effect waves-light" href="#registerStudent" data-target="registerStudent" data-position="right" data-tooltip="Add Student &amp; Instructors"><i className="material-icons">add</i></a>
                    </div>
                </div>
            </PageContainer>    
        )

    }

}

export default Course