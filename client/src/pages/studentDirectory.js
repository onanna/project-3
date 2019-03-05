import React, { Component } from "react";
import Pagecontainer from "../components/pageContainer"
import API from "../utils/API"
import booksImg from "../images/books1.jpg";

class Home extends Component{
    state={
        students:[],
        chosenStudent:""
    }

    componentDidMount(){
        this.getAllStudents();
    }

    addStudent=(studentToAdd)=>{
        API.addStudent(studentToAdd)
            // .then(res=>console.log("student added" + res))
            .then(this.getAllStudents())
    }
    updateStudent=(idOfStudentToUpdate,whatToChange,newValue)=>{
        API.updateStudent(idOfStudentToUpdate,whatToChange,newValue)
            .then(this.getAllStudents())
            .catch(err => console.log(err));
    }
    getAStudent=(indexOfStudentToGet)=>{
      alert( JSON.stringify( this.state.students[indexOfStudentToGet]))
      let chosen=this.state.students[indexOfStudentToGet];
    }
    getAllStudents=()=>{
        API.getAllStudents()
            .then(res => this.setState({ students: res.data }))
            .catch(err => console.log(err));
    }
    deleteStudent=(idToDelete)=>{
        console.log(idToDelete)
        API.deleteStudent(idToDelete)
            // .then(response=> this.setState({students:response.data}))
            .then(this.getAllStudents());
    }

    render(){
        return(
            <Pagecontainer>
                <div className="row">
                    <div className="col s12 m5 blue darken-4">
                        <div className="card-panel">
                            <h1>All Students</h1>
                        </div>
                        <div className="card-panel grey lighten-2">
                            <ul className="collection">
                                {this.state.students.map((current,i)=>{
                                    return (
                                        <ul>
                                            <li key={i}>Name: {current.firstName} {current.lastName}</li>
                                            <li key={i}>Email: {current.email}</li>
                                            <li key={i}>Phone Number: {current.phone}</li>
                                            <li key={i}>Currently Enrolled: {current.currentlyEnrolled}</li>
                                            <li key={i}>Previously Enrolled: {current.pastCourses}</li>
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

export default Home;