import React, { Component } from "react";
import "./../savedCourse/savedCourse.css";
import PageContainer from "../../components/pageContainer";
import API from "../../utils/API";
import H1 from "../../components/h1withDivider";
import {Col, Card} from 'react-materialize';
import booksImg from "../../images/books1.jpg"

class Course extends Component {
    state={
        course:{}

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
                <div className="row"> 
                    <div className="col s12 m6">
                        <div className="card" id="courseCard">
                            <div className="card-image">

                                <img src={booksImg} alt="books" />    

                                <a className="btn tooltipped btn-large btn-floating halfway-fab waves-effect waves-light red" data-position="right" data-tooltip="Add Student"><i className="material-icons">add</i></a>

                                <div className="card-content" id="courseContent">
                                    <h4>{this.state.course.name}</h4>   
                                    <p><b> Number of Seats Available:</b> {this.state.course.numberOfSeats}</p>
                                    <p><b>Start Date:</b> {this.state.course.startDate}</p>
                                    <p><b>End Date:</b> {this.state.course.endDate}</p>
                                    <p><b>Start Time:</b> {this.state.course.startTime}</p>
                                    <p><b>End Time:</b> {this.state.course.endTime}</p>
                                    <p><b>Location:</b> {this.state.course.location}</p>
                                    <p><b>Instructor:</b> {this.state.course.instructors}</p>
                                    <p><b>Students Registered:</b> {this.state.course.students}</p>
                                </div>
                            
                            </div>
                        </div>
                    </div>
                </div>
            </PageContainer>    
        )

    }

}

export default Course