import React, { Component } from "react";
import "./../savedCourse/savedCourse.css";
import PageContainer from "../../components/pageContainer";
import Register from "../../components/registerStudentForm/registerStudent";
import API from "../../utils/API";
import Header from "../../components/h1withDivider";
import Send from "../../components/sendAttendance/sendAttendance2"
import booksImg from "../../images/books1.jpg";
import NightImg from '../../images/nightBanner.jpg'
import * as date from '../../utils/dateReaders';
import StudentSelect from "../../components/selectStudents/selectStudents";
import InstructorSelect from "../../components/selectInstructors/selectInstructors";
import Submit from '../../components/submitButton/index'
import M from 'materialize-css';
const $ = window.$;



class Course extends Component {
    
    state={
        course:{
            instructors:[],
            attendanceRecords:[],
            students:[],
            startTime:"",
            endTime:""
        },
        instructorsToAdd:[],
        studentsToAdd:[],
        addExistStuNotice:'',
        addExistInstNotice:'',
        hasBeenSent:false,
        showStuSelect:false,
        showInsSelect:false,
        wantsToDelete:false
    }
  
    constructor(props){
        super(props);
        
        API.getOneCourse(this.props.match.params.id)
        .then(response=> this.setState({course:response.data}))
        .catch(err => console.log("ERROR ERROR ERROR "+err))
    }

    updateCourseStudents=(newStudents)=>{
        let newState = this.state.course
        newState.students=newStudents
        this.setState((prev)=>({
            course:newState
        }))
    }
    updateCourseInstructors=(newInstructors)=>{
        let newState = this.state.course
        newState.instructors=newInstructors
        this.setState((prev)=>({
            course:newState
        }))
    }

    getSelectedInstructors=(selected)=>{
        let instructorsSelected =[]
        selected.forEach((element,i) => {
            instructorsSelected.push(element.value)
        });
        this.setState({
            instructorsToAdd:instructorsSelected
        })
    }

    getSelectedStudents=(selected)=>{
        let studentsSelected =[]
        selected.forEach((element,i) => {
            studentsSelected.push(element.value)
        });
        this.setState({
            studentsToAdd:studentsSelected
        })
    }

    selectStudentChange=(currentList)=>{
        if(currentList.length<1){
          $('#existStudentSubmit2').css('display','none');
        }else{
          $('#existStudentSubmit2').css('display','inherit')
        }
      
      this.setState((prev)=>({
        studentsToAdd:currentList
      }))
    }

    selectInstructorChange=(currentList)=>{
        if(currentList.length<1){
          $('#existInstructSubmit2').css('display','none');
        }else{
          $('#existInstructSubmit2').css('display','inherit')
        }
        this.setState((prev)=>({
          instructorsToAdd:currentList
        }))
    }

    showSelect=(whichSelect)=>{

        switch(whichSelect){
            case "students":
                if(this.state.showStuSelect===false){
                    this.setState((prev)=>({
                        showStuSelect:true
                    }))
                }else{
                    this.setState((prev)=>({
                        showStuSelect:false
                    }))
                }
            break;

            case "instructors":
                if(this.state.showInsSelect===false){
                    this.setState((prev)=>({
                        showInsSelect:true
                    }))
                }else{
                    this.setState((prev)=>({
                        showInsSelect:false
                    }))
                }
            break;
        }
 
    }

    addToRoster=(roster,optionalData)=>{

        let whoToAdd;
        let data;
        switch(roster){
          case 'students':
            whoToAdd=this.state.studentsToAdd;
            data=[];
            whoToAdd.forEach((current,i)=>{
              data.push(current.value)
            })
            if(data.length<1) return;
            API.addStudentsToCourse(this.state.course._id,data)
            .then(result=>{
              if(result.data.success){
                this.setState((prev)=>({
                  addExistStuNotice: data.length===1? `Student Added Successfully!` : 'Students Added Successfully!',
                }))
                this.updateCourseStudents(result.data.success.students)
                setTimeout(()=>{
                  this.setState((prev)=>({
                    addExistStuNotice:'',
                    showStuSelect:false
                  }))
                },1500)
              }
            })
            .catch(error=>{
              alert('error '+JSON.stringify(error))
            })
          break;
    
          case 'instructors':
            whoToAdd=this.state.instructorsToAdd;
            data=[];
            whoToAdd.forEach((current,i)=>{
              data.push(current.value)
            })
            if(data.length<1) return;
            API.addInstructorsToCourse(this.state.course._id,data)
            .then(result=>{
              if(result.data.success){
                this.setState((prev)=>({
                  addExistInstNotice: data.length===1? `Instructor Added Successfully!` : 'Instructors Added Successfully!',
                }))
                this.updateCourseInstructors(result.data.success.instructors)
                setTimeout(()=>{
                  this.setState((prev)=>({
                    addExistInstNotice:'',
                    showInsSelect:false
                  }))
                },1500)
              }
            })
            .catch(error=>{
              alert('error '+JSON.stringify(error))
            })
          break;
    
          default:
          break;
        }
    }

    toggleDelete=()=>{
        if(this.state.wantsToDelete===false){
            this.setState((prev)=>({
                wantsToDelete:true
            }))
        }else{
            this.setState((prev)=>({
                wantsToDelete:false
            }))
        }
    }

    deleteCourse=(userId,courseId)=>{
        API.deleteCourse(userId,courseId)
            .then((result)=>{
                if(result.data.success){
                    M.toast({html: 'Course Deleted',displayLength:1000,classes: 'rounded green white-text',completeCallback: function(){ window.location.replace('/')}})
                    // window.location.replace('/')
                }else{
                    alert('course could not be deleted')
                }
            })
            .catch(err => console.log(err));
    }

    componentDidMount=()=>{
        $('.modal').modal();
        $('.collapsible').collapsible();
        $('.tooltipped').tooltip();
        $('ul.tabs').tabs({
            // 'swipeable': true,
            // 'responsiveThreshold' : Infinity
        });
    }

    render(){
        return(
            <PageContainer>
                <div className="row" id="courseCard"> 
                    <div className="col s12 m6">
                        <div className="card">
                            <div className="card-image">
                                {/* <img src={booksImg} alt="books" /> */}
                                <img src={NightImg} alt='Night Sky Banner'/>
                                {/* <img src='https://www.rmg.co.uk/sites/default/files/styles/banner/public/August%20NSH%20banner.jpg?itok=tvQxyj6W' /> */}
                                
                                {/* <img src='https://png.pngtree.com/thumb_back/fw800/back_pic/00/01/87/34560c9a55c41fd.jpg' />
                                <img src='https://png.pngtree.com/thumb_back/fw800/back_pic/00/01/88/99560cf3e33f5a8.jpg' />
                                <img src='https://png.pngtree.com/thumb_back/fw800/back_pic/00/02/00/41560f3c6f9dadb.jpg'/> */}
                                <span id='cardTitle' className='card-title flow-text'>{this.state.course.name}</span> 
                            </div>
                            <div id="registerStudent" className="modal">
                                <h4 id="modalHeader">Register Students</h4>
                                <Register  updateCourseInstructors={this.updateCourseInstructors} updateCourseStudents={this.updateCourseStudents} courseId={this.state.course._id} />            
                            </div>                            
                            <ul id="tabs-swipe" className="tabs">
                                <li className="tab col s4"><a className="active" href="#courseContent">Details</a></li>
                                <li className="tab col s4"><a  href="#classRoster">Roster</a></li>
                                <li className="tab col s4"><a href="#test-swipe-3">Attendance</a></li>
                            </ul>

                            {/* Course Content & Student Roster in Tabs */}
                            <div id="courseContent" className="col s12 grey lighten-3 tabContent">               
                                {/* <h4 className='bold m-top'>{this.state.course.name}</h4>   */}
                                <h4 className='bold m-top'>Details</h4>
                                <p className='flow-text'><b> Number of Seats Available:</b> {this.state.course.numberOfSeats}</p>
                                <p className='flow-text'><b>Start Date:</b> {this.state.course.startDate? date.readDate(this.state.course.startDate) : this.state.course.startDate}</p>
                                <p className='flow-text'><b>End Date:</b> {this.state.course.startDate? date.readDate(this.state.course.endDate) : this.state.course.endDate}</p>
                                <p className='flow-text'><b>Start Time:</b> {date.dropTimeZero(this.state.course.startTime)}</p>
                                <p className='flow-text'><b>End Time:</b> {date.dropTimeZero(this.state.course.endTime)}</p>
                                {/* <p className='flow-text'><b>Start Time:</b> {this.state.course.startTime}</p>
                                <p className='flow-text'><b>End Time:</b> {this.state.course.endTime}</p> */}
                                <p className='flow-text'><b>Location:</b> {this.state.course.location}</p>
                                {
                                    this.state.wantsToDelete===false?
                                        <a id='deleteCourseButton' onClick={this.toggleDelete} className='flow-text btn btn-large white red-text'>Delete Course</a>
                                    :
                                    <div>
                                        <p id='deleteCourseConfirm'className='flow-text' onClick={this.toggleDelete}>Deleting a course will also delete its attendance records and rosters.<br/>Click here to go back or click "Delete" to continue</p>
                                        <a onClick={()=>this.deleteCourse(this.props.userId, this.state.course._id)} className='flow-text btn btn-large red white-text'>Permanently Delete</a>                                
                                    </div>
                                }
                            </div> 

                            <div id="classRoster" className="col s12 grey lighten-3 tabContent left-align courseTab">
                                                                                   
                                <h4 className='bold m-top left-align'>Roster</h4>
                                
                                <p className='flow-text rosterHeader left-align'>Instructors</p>
                                <ol className='left-align roster'>
                                    {this.state.course.instructors.map((current,i)=>{
                                        return(
                                            <li key={i}className='flow-text light'>{`${current.firstName} ${current.lastName}`}</li>
                                        )
                                    })}
                                </ol>
                                {   
                                    this.state.course.instructors.length>0 && this.state.showInsSelect===false?
                                    
                                    <a id='addPersonButton' className='btn btn-small' onClick={()=>this.showSelect('instructors')}><i class="addPerson flow-text material-icons right-align">add</i></a>
                                    :
                                    <div className='margin-b'>
                                        <InstructorSelect userId={this.props.userId} onChange={this.selectInstructorChange} />
                                        <div id="existInstructSubmit2"><Submit submitFunction={()=>this.addToRoster('instructors')}/></div>
                                        <div className='center-align errorRow'>
                                        {
                                            this.state.addExistInstNotice.length>0?
                                            this.state.addExistInstNotice.includes('Added')?
                                                <p className='successMessage'>{this.state.addExistInstNotice}</p>
                                                :
                                                <p className='errorMessage'>{this.state.addExistInstNotice}</p>
                                            :
                                            <div></div>
                                        }
                                        </div>
                                    </div>
                                }
                                
                                <p className='flow-text rosterHeader left-align'>Students</p>
                                <ol className='roster left-align'>
                                    {this.state.course.students.map((current,i)=>{
                                        return(
                                            <li key={i} className='flow-text light'>{`${current.firstName} ${current.lastName}`}</li>
                                        )
                                    })}
                                </ol>
                                {
                                    this.state.course.students.length>0 && this.state.showStuSelect===false?

                                    <a id='addPersonButton' className='btn btn-small' onClick={()=>this.showSelect('students')}><i class="addPerson flow-text material-icons right-align">add</i></a>
                                    :
                                    <div  className='margin-b'>
                                        <StudentSelect userId={this.props.userId} onChange={this.selectStudentChange} />
                                        <div id="existStudentSubmit2"><Submit submitFunction={()=>this.addToRoster('students')}/></div>
                                        <div className='center-align errorRow'>
                                            {
                                            this.state.addExistStuNotice.length>0?
                                                this.state.addExistStuNotice.includes('Added')?
                                                    <p className='successMessage'>{this.state.addExistStuNotice}</p>
                                                    :
                                                    <p className='errorMessage'>{this.state.addExistStuNotice}</p>
                                                :
                                                ''
                                            }
                                        </div>
                                    </div>
                                }
                            </div>

                            <div id="test-swipe-3" className="col s12 grey lighten-3 tabContent courseTab">

                                <h4 className='bold m-top'>Records</h4>
                                <ul className='collapsible'>
                                    {this.state.course.attendanceRecords.map((current,i)=>{
                                        return(
                                                <li  key={i}>
                                                    <div className='collapsible-header flow-text'>{date.readDate(current.date)}</div>
                                                    <div className='collapsible-body'>
                                                        {current.students.map((current,i)=>{
                                                            return(
                                                                <div  key={i} className='row'>
                                                                    <div className='col s6 right-align'>
                                                                        <p className='stuAttName'>{`${current.student.firstName} ${current.student.lastName}`}</p>
                                                                    </div>
                                                                    <div className='col s6 vertical-align'>
                                                                        <p>{current.inAttendance? <i className='material-icons check small'>check</i>:<i className='material-icons clear'>clear</i>}</p>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                </li>
                                        )
                                    })}
                                </ul>

                                {this.state.course.students.length>0 && this.state.course.instructors.length>0?
                                    <div className='bottom'>
                                        <p className='sendToText flow-text'>Send To Instructor</p>                            
                                        <Send instructors={this.state.instructors} attendLink={`https://gentle-garden-19053.herokuapp.com/attendance/temp362019/${this.props.token}/${this.state.course._id}`} clickFunction={this.sendAttendanceForm}instructors={this.state.course.instructors}/>
                                        <a href={`/attendance/temp362019/${this.props.token}/${this.state.course._id}`} target="_blank">Attendance Form</a>
                                    </div>
                                :
                                    <div className='bottom'></div>
                                }
                            </div>
                        
                        </div>
                        
                        {/* Register Student/ Add Instructor Button */}
                        {/* <a id='LightBlue'className="btn modal-trigger tooltipped btn-large btn-floating halfway-fab waves-effect waves-light" href="#registerStudent" data-target="registerStudent" data-position="right" data-tooltip="Add Student &amp; Instructors"><i className="material-icons">add</i></a> */}
                    </div>
                </div>
            </PageContainer>    
        )

    }

}

export default Course