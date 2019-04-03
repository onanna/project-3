import React, {Component } from "react";
import Pagecontainer from "../../components/pageContainer"
import API from "../../utils/API";
import Header from "../../components/h1withDivider";
import CourseCard from '../../components/courseCard/courseCard'
import './style.css'

class Home extends Component{
    state={
        allCourses:[],
        students:[],
        instructors:[]
    }

    componentDidMount(){
        API.getAllCourses(this.props.userId)
            .then(res => this.setState({allCourses:res.data}))
            .catch(err => console.log(err));
    }

    getACourse=(courseId)=>{
        API.getACourse(courseId)
            .then(res => this.setState({allCourses:res.data}))
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

    goToCourse=(courseId)=>{
        window.location.href=`/courses/detail/${courseId}`;
    }
   
    linkToCourse=(courseId)=>{
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
            <div>
            <a href='/newcourse'id='courseAddButton'class="fixed-action-btn btn-floating btn-large red"><i class="material-icons">add</i></a>
            {/* <h3 id='buttonLabel'>Add Course</h3> */}
            <h3 id='buttonLabel'>Add</h3>
            <Pagecontainer>
                <div className='mainClass row'>
                    {/* <div className='left col s12 m6 mainCourseCol'>
                        <div className='mainCourseCard addCard card small hoverable center-align'>
                            <i class="material-icons large">add_circle</i>
                        </div>
                    </div> */}
                    {
                        this.state.allCourses.map((current,i)=>{
                            return(
                                <div key={i} className='left col s12 m6 mainCourseCol'>
                                    <div onClick={()=>this.goToCourse(current._id)} className="mainCourseCard card small hoverable">
                                        <CourseCard course={current}/>
                                    </div>
                                </div>
                            
                            )
                        })
                    }
                </div>
            </Pagecontainer>
            </div>
        )
   }

}

export default Home;