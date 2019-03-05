import React, { Component } from "react";
import Pagecontainer from "../components/pageContainer"
import API from "../utils/API"

let newStudentTest = {
    firstName:"new",
    lastName:"stude22nt!",
    email:"funtsfimes2@gmail.com",
    phone:"+19732233733"
}

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
                <h1>All Students</h1>
                <h2>Number of students: {this.state.students.length}</h2>
                <div class="row">
                    <div class="col s12 m5">
                        <div class="card-panel teal">
                            <ul className="collection">
                                <h3>{this.state.students.firstName}</h3>
                                <h4>{this.state.students.lastName}</h4>
                                <p><b>Email: {this.state.students.email}</b></p>
                                <p><b>Phone Number: {this.state.students.phone}</b></p>
                                <p><b>Classes currently enrolled in: {this.state.students.currentlyEnrolled}</b></p>
                                <p><b>Classes previously enrolled in: {this.state.students.pastCourses}</b></p>
                                {/* {this.state.students.map((current,i)=>{
                                    return (
                                        <li onClick={()=>this.addStudent(newStudentTest)} key={i} className="collection-item"> {JSON.stringify(current)}</li>
                                    )
                                })
                                } */}
                            </ul>
                        </div>
                    </div>
                </div>
            </Pagecontainer>
        )
    }
}

export default Home;