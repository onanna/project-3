import './style.css';
import React, { Component } from "react";
import Pagecontainer from "../../components/pageContainer/index"
import SubmitButton from "../../components/submitButton"
import {Row, Col, Input} from 'react-materialize';
import API from "../../utils/API";
import Header from "../../components/h1withDivider/index"
const dateFormat=require('dateformat')
const $=window.$;

class attendanceForm extends Component{

    constructor(props){
        super(props)
        
        this.state.deleteFunction=props.deleteToken
        
        // API.getOneCourse(this.props.match.params.courseId)
        API.getOneCourse(props.courseId)
        .then(response=> this.setState({course:response.data}))
        .catch(err => console.log("ERROR ERROR ERROR "+err))

        this.deleteToken=props.deleteToken;
    }
    
    state={
        deleteFunction:{},
        course:{
            students:[]
        },
        studentsinAttendance:[],
        date:dateFormat(new Date(), 'mm-dd-yyyy'),
        sentSuccess:false
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

        API.sendAttendance(data)
        .then(result=>{
            if(result.data.success){
                this.setState({sentSuccess:true})
                // alert('Attendance Sent! You will now be redirected to login')
                $('body').fadeOut(1500);
                setTimeout(()=>{
                    this.deleteToken();
                },2000)

            }else{
                alert('ERROR')
            }
        })  
        .catch(error=>{
            alert('ERROR IN ATTENDANCe: '+JSON.stringify(error))
        }); 
    }

    render(){
        if(!this.state.sentSuccess){
            return(
                <div className='container'>
                    <Header align="center" text={this.state.course.name}/>
                    <h4 className="attendanceDate center-align">March 6th, 2019</h4>
                    <div className="bottomAttend divider"></div>
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
                </div>
            )
        }else{
            return(
                <div className='container'>
                    <Header align='center' text='Attendance Sent!'/>
                </div>
            )
        }
    }
}

export default attendanceForm;