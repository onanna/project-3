import React from "react";
import "./style.css";

//need function to break down day, month, year of startDate
//let startMonth
//let startYear
//let startDay
//need function to show date


function courseCard(props){

    return(
        <div className='mainClass row'>
            <div className='col s12'>
                <div className="card small hoverable">
                <div className='row card-content'>
                    
                    <div className='col s12 m3 center-align left-pane-course'>
                    <div className='row white-text flow-text center-align'>
                        <div className='col s12'>
                            <h3 className='classDate'>12</h3>
                        </div>
                    </div>
                    <div className='row'>
                        <div className="col s6 classMonth white-text right-align flow-text"><p>March </p></div>
                        <div className="col s6 classYear white-text left-align flow-text"><p> 1993</p></div> 
                    </div>
                        <div className='row'><div className='col s12 white-text flow-text'><p>{props.course.startTime}</p></div></div>
                    </div>
                    
                    
                    
                    <div className='col s12 m9'>
                    <div className='softContainer'>
                        <div className='row'>
                            <div className='col s12'>
                                <p className='right-text flow-text className'>{props.course.name}</p>
                            </div>  
                        </div>

                        <div className='row'>
                            <div className='col s12'>
                                <p className='flow-text classTimeLocation'>{props.course.location} - {props.course.endTime}</p>
                            </div>
                        </div>
                        
                        <div className='row'>
                            <div className='col s12'>
                                <p className='flow-text'><span className='classUntil'>To</span> {props.course.endDate}</p>
                            </div>
                        </div>

                        <div className='row'>
                            <div className='col s12'>
                                <p className='flow-text classStudents'>Students Enrolled: {props.course.students.length}</p>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col s12'>
                                <p className='flow-text classRemaining'>Seats Remaining: {props.course.numberOfSeats - props.course.students.length}</p>
                            </div>
                        </div>
                        {/* <div className='row'>
                            <div className='col s6'>
                                <p className='flow-text classStudents center-align'>Students Enrolled: </p>
                            </div>
                            <div className='col s6'>
                                <p className='flow-text classRemaining center-align'>Seats Remaining: </p>
                            </div>
                        </div>

                        <div className='row'>
                            <div className='col s6'>
                                <p className='flow-text classStudents center-align'>{props.course.students.length}</p>
                            </div>
                            <div className='col s6'>
                                <p className='flow-text classRemaining center-align'>{props.course.numberOfSeats - props.course.students.length}</p>
                            </div>
                        </div> */}
                        
                    </div>
                    </div>
                    
                    
                </div>
                </div>
            </div>
        </div>
    )
}

export default courseCard;