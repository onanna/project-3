import React from "react";
import "./style.css";

//need function to break down day, month, year of startDate
//let startMonth
//let startYear
//let startDay
//need function to show date



function courseCard(props){

    return(
    
            <div className='row card-content'>
                
                <div className='left col s12 m3 center-align left-pane-course'>
                    <div className='row white-text center-align'>
                        <div className='col s12'>
                            <h3 className=' classDate'>{readDay(splitDate(props.course.startDate)[1])}</h3>
                        </div>
                    </div>
                    <div className='row'>
                        {/* <div className="col s6 classMonth white-text right-align flow-text"><p>March</p></div> */}
                        <div className="col s12 classMonth center-align white-text flow-text"><p>{readMonth(splitDate(props.course.startDate)[0])} </p></div>
                        {/* <div className="col s6 classYear white-text left-align flow-text"><p> 1993</p></div>  */}
                    </div>

                    <div className='row'>
                        <div className='col s12 center-align white-text flow-text'><p>2019</p></div>
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
                            <p className='flow-text'><span className='classUntil'>To </span>{readDate(props.course.endDate)}</p>
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

function splitDate(date){
    let mm = date.split("-")[0];
    let dd = date.split("-")[1];
    let yyyy = date.split("-")[2];

    return [mm,dd,yyyy]
}
function readMonth(month){
    let newMonth='';
    switch(month){
        case "1":
        newMonth="January"
        break;
    
        case "2":
        newMonth="February"
        break;
    
        case "3":
        newMonth="March"
        break;
        case "4":
        newMonth="April"
        break;
        case "5":
        newMonth="May"
        break;
        case "6":
        newMonth="June"
        break;
        case "7":
        newMonth="July"
        break;
        case "8":
        newMonth="August"
        break;
        case "9":
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
    return newMonth.substring(0,3);
}
function readDay(dd){

    let neatDay=dd
    let suffix="th";

    if(dd.charAt(0)==="0"){
        neatDay=dd.charAt(1);
    }

    if(dd==="11"||dd==="12"||dd==="13"){
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

    return neatDay
}

//make date more readable
function readDate(dateToRead){
    let date = dateToRead;
    let mm = date.split("-")[0];
    let dd = date.split("-")[1];
    let yyyy = date.split("-")[2];

    let suffix="th";
    let newMonth;
    let newDay = dd;

    console.log(date)
    console.log(mm)
    console.log(dd)
    console.log(yyyy)
    


  
    //not necessary because date not saving with 0 in front of 1-9
    if(dd.charAt(0)==="0"){
      newDay=dd.charAt(1);
    }
  
    console.log(dd)

    //if dd is 11, 12, or 13, suffix remains as "th". If not, check second number for 1, 2, or 3 to change the suffix
    if(dd==="11"||dd==="12"||dd==="13"){
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
      case "1":
      newMonth="January"
      break;
  
      case "2":
      newMonth="February"
      break;
  
      case "3":
      newMonth="March"
      break;
      case "4":
      newMonth="April"
      break;
      case "5":
      newMonth="May"
      break;
      case "6":
      newMonth="June"
      break;
      case "7":
      newMonth="July"
      break;
      case "8":
      newMonth="August"
      break;
      case "9":
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