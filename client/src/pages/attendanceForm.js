import React, { Component } from "react";
import Pagecontainer from "../components/pageContainer/index"
import SubmitButton from "../components/submitButton"
import {Row, Col, Input} from 'react-materialize';
import API from "../utils/API"

class attendanceForm extends Component{
    state={
        course:{
            "_id" : "5c6b65cfb6799b38f4a2d943",
            "name" : "Biology",
            "startDate" :"2019-02-19T02:11:24.885Z",
            "endDate" : "2019-02-19T02:11:24.885Z",
            "startTime" : "06:30PM",
            "endTime" : "08:30PM",
            "location" : "134 sip ave. Jersey City NJ, 07109",
            "instructors" : [],
            "students" : [
                {
                    "_id" : "5c6b731193c50c39a88c50b4",
                    "firstName" : "Tony",
                    "lastName" : "See",
                    "email" : "someemail@gmail.com",
                    "currentlyEnrolled" : [],
                    "pastCourses" : []
                },
                {
                    "_id" : "5c6b731193c50c39a88c50b5",
                    "firstName" : "David",
                    "lastName" : "jack",
                    "email" : "someOtheremail@yahoo.com",
                    "currentlyEnrolled" : [],
                    "pastCourses" : []
                },
                {
                    "_id" : "5c6b731193c50c39a88c50b4",
                    "firstName" : "Tony",
                    "lastName" : "See",
                    "email" : "someemail@gmail.com",
                    "currentlyEnrolled" : [],
                    "pastCourses" : []
                },
                {
                    "_id" : "5c6b731193c50c39a88c50b5",
                    "firstName" : "David",
                    "lastName" : "jack",
                    "email" : "someOtheremail@yahoo.com",
                    "currentlyEnrolled" : [],
                    "pastCourses" : []
                }
            ]
        },
        studentsinAttendance:[],
        date:new Date()
    }

    //need API.getCourse() unless course gets passed from allCourses home page

    componentDidMount(){
    }

    handleAttendanceToggle(){
        //update state everytime one is toggled to prepare for send to backend
    }

    sendAttendanceForm(){
        alert("send form now")
        //API.sendAttendance --> axios.post(/course-attendance/courseId/date)
    }

    render(){
        return(
            <Pagecontainer>
                <h1 className="attendance-header center-align">Students in this Class</h1>
                {
                    this.state.course.students.map((current,i)=>{
                        return(
                            <Row key={i}>
                                <Col s={8}>
                                    <p className="flow-text">{`${current.firstName} ${current.lastName}`}</p>
                                </Col>
                                <Col s={4}>
                                    <div className="switch right-align">
                                        <label>
                                            <input type="checkbox" />
                                            <span className="lever"></span>
                                        </label>
                                    </div>
                                </Col>
                            </Row>
                        )
                    })
                }
                <Row>
                    <SubmitButton submitFunction={()=>this.sendAttendanceForm()} />
                </Row>
            </Pagecontainer>
        )
    }
}

export default attendanceForm;