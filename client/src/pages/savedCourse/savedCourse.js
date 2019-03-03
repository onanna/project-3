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
        
        API.getOneCourse(this.props.match.params.id)
        .then(response=> this.setState({course:response.data}))
        .catch(err => console.log("ERROR ERROR ERROR "+err))
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

                    <Send attendLink={`/attendance/temp362019/${this.props.token}/${this.state.course._id}`} instructors={this.state.testStudents}/>
                    {/* <a href={`/attendance/temp362019/${this.props.token}/${this.state.course._id}`}>Attendance</a> */}
            </PageContainer>    
        )

    }

}

export default Course