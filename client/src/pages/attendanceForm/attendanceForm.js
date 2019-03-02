import './style.css';
import React, { Component } from "react";
import Pagecontainer from "../../components/pageContainer/index"
import SubmitButton from "../../components/submitButton"
import {Row, Col, Input} from 'react-materialize';
import API from "../../utils/API";
import Header from "../../components/h1withDivider"

class attendanceForm extends Component{
    state={
        // course:{
        //     "_id" : "5c6b65cfb6799b38f4a2d943",
        //     "name" : "Biology",
        //     "startDate" :"2019-02-19T02:11:24.885Z",
        //     "endDate" : "2019-02-19T02:11:24.885Z",
        //     "startTime" : "06:30PM",
        //     "endTime" : "08:30PM",
        //     "location" : "134 sip ave. Jersey City NJ, 07109",
        //     "instructors" : [],
        //     "students" : [
        //         {
        //             "_id" : "5c6b731193c50c39a88c50b4",
        //             "firstName" : "Tony",
        //             "lastName" : "See",
        //             "email" : "someemail@gmail.com",
        //             "currentlyEnrolled" : [],
        //             "pastCourses" : []
        //         },
        //         {
        //             "_id" : "5c6b731193c50c39a88c50b5",
        //             "firstName" : "David",
        //             "lastName" : "jack",
        //             "email" : "someOtheremail@yahoo.com",
        //             "currentlyEnrolled" : [],
        //             "pastCourses" : []
        //         },
        //         {
        //             "_id" : "5c6c8a180cc6804a0c2bc7c4",
        //             "firstName" : "Sallie",
        //             "lastName" : "Mae",
        //             "email" : "notbroke@aol.com",
        //             "currentlyEnrolled" : [],
        //             "pastCourses" : []
        //         },
        //         {
        //             "_id" : "5c6c8a51644de70730c1d9aa",
        //             "currentlyEnrolled" : [],
        //             "pastCourses" : [],
        //             "firstName" : "new",
        //             "lastName" : "stude22nt!",
        //             "email" : "funtsfimes2@gmail.com",
        //             "__v" : 0
        //         }
        //     ]
        // },
        course:{},
        studentsinAttendance:[],
        date:new Date()
    }

    //need API.getCourse() unless course gets passed from allCourses home page

    componentDidMount(){
        API.getAllCourses()
            .then(courses=>{
                console.log("one course is "+JSON.stringify(courses.data[0]))
                API.getAllStudents()
                    .then(students=>{
                        API.addStudentsToCourse(courses.data[0]._id,students.data)
                        .then(res=>{this.setState({course:res})})
                        console.log(this.state.course)
                    })
            })
    }

    handleAttendanceToggle(stuId){
        console.log(stuId)
        let tempStudents=this.state.studentsinAttendance;

        if(tempStudents.includes(stuId)){
            let indexToRemove = tempStudents.indexOf(stuId)
            if (indexToRemove != -1) {
                tempStudents.splice(indexToRemove, 1);
            }
        }else{
            tempStudents.push(stuId)
        };

        this.setState({studentsinAttendance:tempStudents})
        console.log(this.state.studentsinAttendance)
    }

    makeRecord=(student,attendance)=>{
        return {
            student:student._id,
            inAttendance: attendance
        }
    }

    sendAttendanceForm(){
        
        // let data={
        //     course:this.state.course._id,
        //     inAttendance:this.state.studentsinAttendance,
        //     date: this.state.date
        // }
        let studentRoster=this.state.course.students
        let inAttendance= this.state.studentsinAttendance

        let records =[]

        let inClassOrNot;
        studentRoster.forEach((current,i)=>{
            if(inAttendance.includes(current._id)){
                inClassOrNot=true;
            }else{
                inClassOrNot=false;                
            }
            records.push(this.makeRecord(current,inClassOrNot));
        })

        let data={
            course:this.state.course._id,
            date: this.state.date,
            students:records,
        }

        alert("send form now"+JSON.stringify(data))
        API.sendAttendance(data); 
        // API.signedTest(data);     
    }

    render(){
        return(
            <Pagecontainer>
                {/* <h1 className="attendance-header center-align">{this.state.course.name}</h1>
                <div className="divider"></div> */}
                <Header align="center-align">attendance</Header>
                <h4 className="attendanceDate center-align">March 6th, 2019</h4>
                <div className="divider"></div>
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
                                            <input onInput={()=>this.handleAttendanceToggle(current._id)} type="checkbox" />
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