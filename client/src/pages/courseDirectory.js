import React, { Component } from "react";
import {Link} from "react-router-dom";
import Pagecontainer from "../components/pageContainer"
import API from "../utils/API";
import Header from "../components/h1withDivider"

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


    // addNewCourse=(courseObject)=>{
    addNewCourse=()=>{
    
        let testCourse={
            name:"newCdfosdsfurse2",
            startDate:new Date(),
            endDate: new Date(),
            startTime:"no",
            endTime:"10pm",
            numberOfSeats:9,
            location:"heyyy at newark nj",
            instructors:[],
            students:[]
        }
        API.addCourse(testCourse)
            .then((response)=>{
                let tempCourses=this.state.allCourses;
                tempCourses.push(response.data);
                this.setState({allCourses:tempCourses})
            })
            .catch(err => console.log(err));
    }
    deleteCourse=(courseId)=>{
        let tempCourses=this.state.allCourses
       
        API.deleteCourse(courseId)
            .then((res)=>{
                tempCourses.splice(tempCourses.indexOf(courseId),1)
                this.setState({allCourses:tempCourses})
            })
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
                                <li key={i} className="collection-item"> <Link to={`/courses/detail/${current._id}`} fullcourse={current}>{JSON.stringify(current)}</Link></li>       
                            )
                        })
                    }
                </ul>
            </Pagecontainer>
        )
   }

}

export default Home;