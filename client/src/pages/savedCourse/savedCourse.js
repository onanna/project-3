import React, { Component } from "react";
import "./../savedCourse/savedCourse.css";
import PageContainer from "../../components/pageContainer";
import Register from "../../components/registerStudentForm/registerStudent";
import API from "../../utils/API";
import H1 from "../../components/h1withDivider";
import {Card, Col} from 'react-materialize';
import Send from "../../components/sendAttendance/sendAttendance"
import booksImg from "../../images/books1.jpg";


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
        ]
    }
  
    constructor(props){
        super(props);
        
        API.getOneCourse(this.props.match.params.id)
        .then(response=> this.setState({course:response.data}))
        .catch(err => console.log("ERROR ERROR ERROR "+err))
    }

    // componentDidMount=()=>{
    //     API.getAllAttendanceFromCourse(this.state.course._id)
    //     .then(response=> console.log('all attendance records are '+ JSON.stringify(response)))
    //     .catch(err => console.log("ERROR ERROR ERROR "+err))
    // }

    render(){
        return(
            <PageContainer>
                <div className="row"> 
                    <div className="col s12 m6">
                        <div className="card" id="courseCard">
                            <div className="card-image">

                                <img src={booksImg} alt="books" /> 

                                {/* Register Student Button */}
                                <a className="btn modal-trigger tooltipped btn-large btn-floating halfway-fab waves-effect waves-light red" href="#registerStudent" data-target="registerStudent" data-position="right" data-tooltip="Add Student"><i className="material-icons">add</i></a>


                                {/* Register Student Modal */}
                                <div id="registerStudent" className="modal">
                                    <h4 id="modalHeader">Register Students</h4>
                                    <Register />                                       
                                </div>                            

                                {/* Course Content Card */}
                                <div className="card-content" id="courseContent">
                                    <h4>{this.state.course.name}</h4>   
                                    <p><b> Number of Seats Available:</b> {this.state.course.numberOfSeats}</p>
                                    <p><b>Start Date:</b> {this.state.course.startDate}</p>
                                    <p><b>End Date:</b> {this.state.course.endDate}</p>
                                    <p><b>Start Time:</b> {this.state.course.startTime}</p>
                                    <p><b>End Time:</b> {this.state.course.endTime}</p>
                                    <p><b>Location:</b> {this.state.course.location}</p>
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