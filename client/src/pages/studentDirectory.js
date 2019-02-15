import React, { Component } from "react";
import Pagecontainer from "../components/pageContainer"
import API from "../utils/API"

class Home extends Component{
    state={
        students:[],
        chosenStudent:""
    }

    componentDidMount(){
        this.getAllStudents();
    }

    updateStudent=(idOfStudentToUpdate,whatToChange,newValue)=>{
        API.updateStudent(idOfStudentToUpdate,whatToChange,newValue)
            .then(this.getAllStudents())
            .catch(err => console.log(err));
    }

    getAStudent=(idOfStudentToGet)=>{
        this.state.students.filter((current,i)=>{
            if(current._id==idOfStudentToGet){
                alert( JSON.stringify(current));
                return current;
            }
        })
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
                            <li onClick={()=>this.getAStudent(current._id)} key={i} className="collection-item"> {JSON.stringify(current)}</li>
                        )
                        })
                    }
                </ul>
            </Pagecontainer>
        )
    }
}

export default Home;