import React, { Component } from "react";
import Pagecontainer from "../components/pageContainer"
import API from "../utils/API"

let newStudentTest = {
    firstName:"new",
    lastName:"stude22nt!",
    userName:"doefsMatter",
    password:"willprobablynotexist",
    email:"funtsfimes2@gmail.com"
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
                <ul className="collection">
                    {
                        this.state.students.map((current,i)=>{
                        return (
                            <li onClick={()=>this.addStudent(newStudentTest)} key={i} className="collection-item"> {JSON.stringify(current)}</li>
                        )
                        })
                    }
                </ul>
            </Pagecontainer>
        )
    }
}

export default Home;