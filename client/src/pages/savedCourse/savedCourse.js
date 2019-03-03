import React, { Component } from "react";
import "./../savedCourse/savedCourse.css";
import PageContainer from "../../components/pageContainer";
import Register from "../../components/registerStudentForm/registerStudent";
import API from "../../utils/API";
import booksImg from "../../images/books1.jpg";


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
                        </div>
                    </div>
                </div>
            </PageContainer>    
        )

    }

}

export default Course