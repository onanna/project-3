import React, { Component } from "react";
import Pagecontainer from "../components/pageContainer"
import API from "../utils/API";

class Home extends Component{
    state={
        allCourses:[],
        students:[],
        instructors:[]
    }

    componentDidMount(){
        this.getCourses();
        this.getAllStudents();
        this.getInstructors();
    }
    
    getInstructors=()=>{
        API.getInstructors()
            .then(res => this.setState({ instructors: res.data }))
            .catch(err => console.log(err));
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


    addNewCourse=(courseObject)=>{
        // let testCourse={
        //     name:"newCdfourse2",
        //     startDate:new Date(),
        //     endDate: new Date(),
        //     startTime:"no",
        //     endTime:"10pm",
        //     location:"heyyy at newark nj",
        //     instructors:[],
        //     students:[]
        // }

        API.addCourse(courseObject)
            .then( this.getCourses())
            .catch(err => console.log(err));
    }
    deleteCourse=(courseId)=>{
        API.deleteCourse(courseId)
            .then(this.getCourses())
            .catch(err => console.log(err));
    }
    updateCourse=(courseId,whatToChange,newValue)=>{
        //validate

        API.updateCourse(courseId,whatToChange,newValue)
            .then(this.getCourses())
            .catch(err => console.log(err));
    }



    addStudentsToCourse=(courseId,studentsToAdd)=>{
        let arrayToSend = this.arrayPassOrMake(studentsToAdd);
        API.addStudentsToCourse(courseId,arrayToSend)
            .then(this.getCourses())
            .catch(err => console.log(err));
    }
    removeStudentsFromCourse=(courseId,studentsToRemove)=>{
        let arrayToSend = this.arrayPassOrMake(studentsToRemove);
        API.removeStudentsFromCourse(courseId,arrayToSend)
            .then(this.getCourses())
            .catch(err => console.log(err));
    }
    addInstructorsToCourse=(courseId,instructorsToAdd)=>{
        alert(instructorsToAdd)
        let arrayToSend = this.arrayPassOrMake(instructorsToAdd);
        alert("sending the array "+JSON.stringify(arrayToSend))
        API.addInstructorsToCourse(courseId,instructorsToAdd)
            .then(this.getCourses())
            .catch(err => console.log(err));
    }
    removeInstructorsFromCourse=(courseId,instructorsToRemove)=>{
        let arrayToSend = this.arrayPassOrMake(instructorsToRemove);
        alert("what to delete: "+JSON.stringify(arrayToSend))
        API.removeInstructorsFromCourse(courseId,arrayToSend)
            .then(this.getCourses())
            .catch(err => console.log(err));
    }
   

    arrayPassOrMake=(data)=>{
        let arrayToReturn=[];

        Array.isArray(data)?
        arrayToReturn=data
        :
        arrayToReturn.push(data);

        return arrayToReturn
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
                                // <li onClick={()=>this.addToCourse("students",this.state.students,current._id)} key={i} className="collection-item">{JSON.stringify(current)}</li>
                                <li onClick={()=>this.removeInstructorsFromCourse(current._id,this.state.instructors[0])} key={i} className="collection-item">{JSON.stringify(current)}</li>           
                            )
                        })
                    }
                </ul>
            </Pagecontainer>
        )
   }

}

export default Home;