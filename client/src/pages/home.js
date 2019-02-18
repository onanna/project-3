import React, { Component } from "react";
import Pagecontainer from "../components/pageContainer"
import API from "../utils/API";

class Home extends Component{
    state={
        allCourses:[],
        students:[]
    }

    componentDidMount(){
        this.getCourses();
        this.getAllStudents();
    }
    getAllStudents=()=>{
        API.getAllStudents()
            .then(res => this.setState({ students: res.data }))
            .catch(err => console.log(err));
    }
    getCourses=()=>{
        console.log("about to get all courses in home.js")
        API.getAllCourses()
            .then(res => this.setState({allCourses:res.data}))
            .catch(err => console.log(err));
    }

    addStudentToCourse=(studentIdsToAdd,courseId)=>{
        alert(courseId)
        API.addStuToCourse(studentIdsToAdd,courseId)
            .then(res=>console.log(res))
            .catch(err => console.log(err));
    }
    addToCourse=(collection,data,courseId)=>{
        alert(collection+data+courseId)
        API.addToCourseRoster(collection,data,courseId)
            .then(this.getCourses())
            .catch(err => console.log(err));
    }
    removeFromCourse=(collection,data,courseId)=>{
        alert(collection+data+courseId)
        API.removeFromCourse(collection,data,courseId)
            .then(this.getCourses())
            .catch(err => console.log(err));
    }
   
   render(){
        return(
            <Pagecontainer>
                <h1>Hi Team!</h1>
                <h2>Number of Courses:{this.state.allCourses.length}</h2>
                <h3>All Courses:</h3>
                <ul className="collection">
                    {
                        this.state.allCourses.map((current,i)=>{
                            return(
                                <li onClick={()=>this.removeFromCourse("students",this.state.students[1],current._id)} key={i} className="collection-item">{JSON.stringify(current)}</li>
                            )
                        })
                    }
                </ul>
            </Pagecontainer>
        )
   }

}

export default Home;