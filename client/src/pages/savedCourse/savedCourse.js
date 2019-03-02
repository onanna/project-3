import React, { Component } from "react";
import "./style.css";
import PageContainer from "../../components/pageContainer";
import API from "../../utils/API";
import H1 from "../../components/h1withDivider";
import {Card, Col} from 'react-materialize';
import Send from "../../components/sendAttendance/sendAttendance"


class Course extends Component {
    state={
        course:{},
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
        console.log(JSON.stringify(this.props.match.params.id))
        
        API.getOneCourse(this.props.match.params.id)
        .then(response=> this.setState({course:response.data}))
        .catch(err => console.log("ERROR ERROR ERROR "+err))
    }

    componentDidMount=()=>{
        console.log("full course: " + this.state.course)
    }

    render(){

        return(
            <PageContainer>

                <h1>Courses</h1>

                {/* <Col m={7} s={12}>
                    <Card horizontal >
                    <p>This is a card!</p>
                    <p>{this.state.course.name}</p>
                    </Card>
                </Col> */}

                    <Send instructors={this.state.testStudents}/>
                    <a href={`/courses/attendance/temp362019?token=?$testToken/sdfasdfasdf`}>Attendance</a>
            </PageContainer>    
        )

    }

}

export default Course