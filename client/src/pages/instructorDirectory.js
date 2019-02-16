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
                <h1>All instructors</h1>
                <h2>Number of instructors: {this.state.instructors.length}</h2>
                <ul className="collection">
                    {
                        this.state.instructors.map((current,i)=>{
                            return(
                                <li onClick={()=>this.updateInstructor(current._id,"lastName","tester")} key={i} className="collection-item">{JSON.stringify(current)}</li>
                            )
                        })
                    }
                </ul>
            </Pagecontainer>
        )
    }
}

export default instructors;