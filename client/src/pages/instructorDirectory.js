import React, { Component } from "react";
import Pagecontainer from "../components/pageContainer/index"
import API from "../utils/API"

let newInstructorTest = {
    firstName:"new",
    lastName:"stude22nt!",
    userName:"dddrf",
    password:"wiffllprobablynotexist",
    email:"f2ff@gmail.com"
}

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
                    <div className="col s12 m5 blue darken-4">
                        <div className="card-panel">
                            <h1>All instructors</h1>
                        </div>
                        <div className="card-panel grey lighten-2">
                            <ul className="collection">
                                {this.state.instructors.map((current,i)=>{
                                    return (
                                        <ul>
                                            <li key={i}>Name: {current.firstName} {current.lastName}</li>
                                            <li key={i}>Email: {current.email}</li>
                                            <li key={i}>Phone Number: {current.phone}</li>
                                            <li key={i}>Currently Teaching: {current.currentlyTeaching}</li>
                                            <li key={i}>Previously Taught: {current.pastCourses}</li>
                                            <hr></hr>
                                        </ul>
                                    )
                                })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </Pagecontainer>
        )
    }
}

export default instructors;