import React, { Component } from "react";
import Pagecontainer from "../components/pageContainer/index"
import API from "../utils/API"
import instructorImg from "../images/instructor.gif";

class instructors extends Component{
    state={
        instructors:[]
    }

    componentDidMount(){
        this.getAllInstructors();
    }

    updateInstructor=(idOfInstructorToUpdate,whatToChange,newValue)=>{
        API.updateInstructor(idOfInstructorToUpdate,whatToChange,newValue)
            .then(this.getAllInstructors())
            .catch(err => console.log(err));
    }
    
    addInstructor=(InstructorToAdd)=>{
        API.addInstructor(InstructorToAdd)
            // .then(res=>console.log("student added" + res))
            .then(this.getAllInstructors())
    }

    getAllInstructors=()=>{
        API.getInstructors()
        .then(res => this.setState({ instructors: res.data }))
        .catch(err => console.log(err));
    }

    deleteInstructor=(idToDelete)=>{
        console.log(idToDelete)
        API.deleteInstructor(idToDelete)
        .then(this.getInstructors())
    }

    render(){
        return(
            <Pagecontainer>
                <div className="row">
                    <div className="card hoverable">
                        <div className="card-image">
                            <img src={instructorImg} alt="instructor" /> 
                        </div>
                        <ul id="tabs-swipe" className="tabs">
                            <li className="col s12"><center>All Instructors</center></li>
                        </ul>
                    </div>
                </div>
                <div className="card hoverable grey lighten-3">
                    {this.state.instructors.map((current,i)=>{
                        return (
                            <ul>
                                <li key={i}><b>Name: </b>{current.firstName} {current.lastName}</li>
                                <li key={i}><b>Email: </b>{current.email}</li>
                                <li key={i}><b>Phone Number: </b>{current.phone}</li>
                                <li key={i}><b>Currently Teaching: </b>{current.currentlyTeaching}</li>
                                <li key={i}><b>Previously Taught: </b>{current.pastCourses}</li>
                                <hr></hr>
                            </ul>
                        )
                    })
                    }
                </div>
            </Pagecontainer>
        )
    }
}

export default instructors;