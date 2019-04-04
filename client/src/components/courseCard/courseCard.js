import React from "react";
import "./style.css";
import * as date from '../../utils/dateReaders';

//need function to break down day, month, year of startDate
//let startMonth
//let startYear
//let startDay
//need function to show date



function courseCard(props){

    return(
    
            <div className='row card-content cardStuff'>
                
                <div className='left col s12 m3 center-align left-pane-course'>
                    <div className='row white-text center-align'>
                        <div className='col s12'>
                            <h3 className=' classDate'>{date.readDay(date.splitDate(props.course.startDate)[1])}</h3>
                        </div>
                    </div>
                    <div className='row'>
                        {/* <div className="col s6 classMonth white-text right-align flow-text"><p>March</p></div> */}
                        <div className="col s12 classMonth center-align white-text flow-text"><p>{date.readMonth(date.splitDate(props.course.startDate)[0])} </p></div>
                        {/* <div className="col s6 classYear white-text left-align flow-text"><p> 1993</p></div>  */}
                    </div>

                    <div className='row'>
                        <div className='col s12 center-align white-text flow-text'><p>2019</p></div>
                    </div>
                    
                    <div className='row'>
                        <div className='col s12 white-text flow-text'><p>{date.dropTimeZero(props.course.startTime)}</p></div>
                    </div>
                
                </div>
                
                
                
                <div className='right col s12 m9'>
                <div className='softContainer'>
                    <div className='row'>
                        <div className='col s12'>
                            <p className='right-text flow-text className'>{props.course.name}</p>
                        </div>  
                    </div>

                    <div className='row'>
                        <div className='col s12'>
                            <p className='flow-text classTimeLocation'>{props.course.location}</p>
                        </div>

                        <br/>
                        <div className='col s12 m12 l12'>
                            <p className='flow-text classEnd'><span className='classUntil'>To </span>{date.readDate(props.course.endDate)}</p>
                        </div>
                    </div>
                    
                    <div className='row'>
                        {/* <div className='col s12'>
                            <p className='flow-text'><span className='classUntil'>To</span> {props.course.endDate}</p>
                        </div> */}
                    </div>

                    <div className='row'>
                        <div className='col s12'>
                            <p className='flow-text classStudents'>Students Enrolled: {props.course.students.length}</p>
                        </div>

                    
                    </div>
                    <div className='row'>
                        {/* <div className='col s12'>
                            <p className='flow-text classRemaining'>Seats Remaining: {props.course.numberOfSeats - props.course.students.length}</p>
                        </div> */}
                        <div className='col s12'>
                            <p className='flow-text classRemaining'>Seats Remaining: {props.course.numberOfSeats - props.course.students.length}</p>
                        </div>
                    </div>
        
                </div>
                </div>
                
                
            </div>

    )
}

export default courseCard;