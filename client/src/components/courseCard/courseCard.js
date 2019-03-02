import React from "react";
import "./style.css";

//need function to break down day, month, year of startDate
//let startMonth
//let startYear
//let startDay
//need function to show date

// $(".datepicker").datepicker({
//     format: "yyyy-mm-dd",
//     maxDate: new Date(),
//     autoClose: true,
//     onClose: function(datePicked) {
    
//       date = $(".datepicker")[0].value;
//       mm = date.split("-")[1];
//       dd = date.split("-")[2];
//       yyyy = date.split("-")[0];
  
//     }
// });





function courseCard(props){

    return(
    
            <div className='row card-content'>
                
                <div className='left col s12 m3 center-align left-pane-course'>
                    <div className='row white-text center-align'>
                        <div className='col s12'>
                            <h3 className=' classDate'>12</h3>
                        </div>
                    </div>
                    <div className='row'>
                        {/* <div className="col s6 classMonth white-text right-align flow-text"><p>March</p></div> */}
                        <div className="col s12 classMonth center-align white-text flow-text"><p>March</p></div>
                        {/* <div className="col s6 classYear white-text left-align flow-text"><p> 1993</p></div>  */}
                    </div>

                    <div className='row'>
                        <div className='col s12 center-align white-text flow-text'><p> 1993</p></div>
                    </div>
                    
                    <div className='row'>
                        <div className='col s12 white-text flow-text'><p>{props.course.startTime}</p></div>
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

                        <div className='col s12 m12 l12'>
                            <p className='flow-text'><span className='classUntil'>To</span> {props.course.endDate}</p>
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

                        <div className='col s12'>
                            <p className='flow-text classRemaining'>Seats Remaining: {props.course.numberOfSeats - props.course.students.length}</p>
                        </div>
                    </div>
                    <div className='row'>
                        {/* <div className='col s12'>
                            <p className='flow-text classRemaining'>Seats Remaining: {props.course.numberOfSeats - props.course.students.length}</p>
                        </div> */}
                    </div>
        
                </div>
                </div>
                
                
            </div>

    )
}

//make date more readable
function readDate(dateToRead){
    let suffix="th";
    let newMonth;
    let newDay;

    let date = dateToRead;
    let mm = date.split("-")[1];
    let dd = date.split("-")[2];
    let yyyy = date.split("-")[0];
  
    //if the date is from 01-09, get rid of "0"
    if(dd.charAt(0)==="0"){
      newDay=dd.charAt(1);
    }
  
    //if dd is 11, 12, or 13, suffix remains as "th". If not, check second number for 1, 2, or 3 to change the suffix
    if(dd!="11"&&dd!="12"&&dd!="13"){
      switch(dd.charAt(1)){
        case "1":
        suffix="st"
        break;
  
        case "2":
        suffix="nd"
        break;
  
        case "3":
        suffix="rd"
        break;
      }
    }
  
    switch(mm){
      case "01":
      newMonth="January"
      break;
  
      case "02":
      newMonth="February"
      break;
  
      case "03":
      newMonth="March"
      break;
      case "04":
      newMonth="April"
      break;
      case "05":
      newMonth="May"
      break;
      case "06":
      newMonth="June"
      break;
      case "07":
      newMonth="July"
      break;
      case "08":
      newMonth="August"
      break;
      case "09":
      newMonth="September"
      break;
      case "10":
      newMonth="October"
      break;
      case "11":
      newMonth="November"
      break;
      case "12":
      newMonth="December"
      break;
    }
    
    // return(newMonth+" "+newDay+suffix+", "+yyyy)
    return(`${newMonth} ${newDay+suffix}, ${yyyy}`)
  }

export default courseCard;