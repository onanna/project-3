import React, { Component } from "react";
import "./../savedCourse/savedCourse.css";
import PageContainer from "../../components/pageContainer";
import Register from "../../components/registerStudentForm/registerStudent";
import API from "../../utils/API";
import H1 from "../../components/h1withDivider";
import {Card, Col} from 'react-materialize';
import Send from "../../components/sendAttendance/sendAttendance"
import booksImg from "../../images/books1.jpg";
import InstructorSelect from '../../components/selectInstructors/selectInstructors'
import StudentSelect from '../../components/selectStudents/selectStudents'

const $ = window.$;

class Course extends Component {
    state={
        course:{
            instructors:[]
        },
        testStudents:[
            {
              firstName:"First",
              lastName:"Instructor",
              email:"something@gmail.com",
              currentlyTeaching:[],
              pastCourses:[],
              phone:"+1someRandomNumber"
            },
            {
              firstName:"numbah",
              lastName:"two",
              email:"someOtherthing@yahoo.com",
              currentlyTeaching:[],
              pastCourses:[],
              phone:"+19732233733"
            },
            {
              firstName:"Noel",
              lastName:"Holiday",
              email:"nice@aol.com",
              currentlyTeaching:[],
              pastCourses:[],
              phone:"+1someRandomNumber"
            },
        ],
        instructorsToAdd:[],
        studentsToAdd:[]
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
        $('.tooltipped').tooltip();
        $('ul.tabs').tabs({
            'swipeable': true,
            'responsiveThreshold' : Infinity
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
                        <div className="card hoverable">
                            <div className="card-image">

                                <img src={booksImg} alt="books" /> 

                                {/* Register Student Button */}
                                <a className="btn modal-trigger tooltipped btn-large btn-floating halfway-fab waves-effect waves-light red" href="#registerStudent" data-target="registerStudent" data-position="right" data-tooltip="Add Student"><i className="material-icons">add</i></a>

                                {/* Register Student Modal */}
                                <div id="registerStudent" className="modal">
                                    <h4 id="modalHeader">Register Students</h4>
                                    <Register />            
                                </div>                            
                                <ul id="tabs-swipe" className="tabs">
                                    <li className="tab col s4"><a className="active" href="#courseContent">Course Details</a></li>
                                    <li className="tab col s4"><a  href="#classRoster">Class Roster</a></li>
                                    <li className="tab col s4"><a href="#test-swipe-3">Test 3</a></li>
                                </ul>

                                {/* Course Content & Student Roster in Tabs */}
                                <div id="courseContent" className="col s12 grey lighten-3">               
                                    <h4 onClick={this.getSelectedInstructors}>{this.state.course.name}</h4>  
                                    <StudentSelect onChange={this.getSelectedStudents} />
                                    <InstructorSelect onChange={this.getSelectedStudents} />                                    
                                    <p><b> Number of Seats Available:</b> {this.state.course.numberOfSeats}</p>
                                    <p><b>Start Date:</b> {this.state.course.startDate}</p>
                                    <p><b>End Date:</b> {this.state.course.endDate}</p>
                                    <p><b>Start Time:</b> {this.state.course.startTime}</p>
                                    <p><b>End Time:</b> {this.state.course.endTime}</p>
                                    <p><b>Location:</b> {this.state.course.location}</p>
                                    {/* <Select className="basic-multi-select" classNamePrefix="select" isMulti name="colors" options={testoptions}/> */}
                                </div> 

                                <div id="classRoster" className="courseTab" className="col s12 grey lighten-3">
                                    <h4>Class Roster</h4>
                                </div>

                                <div id="test-swipe-3" className="courseTab" className="col s12 grey lighten-3">
                                    Test 3
                                </div>
                            </div>

                             {/* <Send attendLink={`/attendance/temp362019/${this.props.token}/${this.state.course._id}`} instructors={this.state.course.instructors}/>
                            <a href={`/attendance/temp362019/${this.props.token}/${this.state.course._id}`}>Attendance Form</a> */}
                        
                        </div>
                    </div>
                </div>
            </PageContainer>    
        )

    }

}

export default Course