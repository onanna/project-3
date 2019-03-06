import React, { Component } from "react";
import Pagecontainer from "../components/pageContainer"
import API from "../utils/API"
import learningImg from "../images/learning.jpg";

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
                        <div className="card hoverable">
                            <div className="card-image">
                                <img src={learningImg} alt="learning" /> 
                            </div>
                            <ul id="tabs-swipe" className="tabs">
                                <li className="col s12"><center>All Students</center></li>
                            </ul>
                        </div>
                </div>
                <div className="card hoverable">
                <div className="col s12 grey lighten-3">  
                                {this.state.students.map((current,i)=>{
                                    return (
                                        <ul>
                                            <li key={i}><b>Name: </b>{current.firstName} {current.lastName}</li>
                                            <li key={i}><b>Email: </b>{current.email}</li>
                                            <li key={i}><b>Phone Number: </b>{current.phone}</li>
                                            <li key={i}><b>Currently Enrolled: </b>{current.currentlyEnrolled}</li>
                                            <li key={i}><b>Previously Enrolled: </b>{current.pastCourses}</li>
                                            <hr></hr>
                                        </ul>
                                    )
                                })
                                }
                            </div>
                            </div>
            </Pagecontainer>
        )
    }
}

export default Home;