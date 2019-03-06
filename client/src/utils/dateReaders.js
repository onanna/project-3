export function splitDate(date){
    let mm = date.split("-")[0];
    let dd = date.split("-")[1];
    let yyyy = date.split("-")[2];

    return [mm,dd,yyyy]
}

export function readMonth(month){
    let newMonth='';
    if(month.charAt(0)==="0"){
        month=month.charAt(1);
    }
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

        default:
        break;
    }

    return newMonth;
}

export function readDay(dd){

    let neatDay=dd
    // let suffix="th";

    if(dd.charAt(0)==="0"){
        neatDay=dd.charAt(1);
    }

    // if(dd==="11"||dd==="12"||dd==="13"){
    //     switch(dd.charAt(1)){
    //       case "1":
    //       suffix="st"
    //       break;
    
    //       case "2":
    //       suffix="nd"
    //       break;
    
    //       case "3":
    //       suffix="rd"
    //       break;

    //       default:
    //       break;
    //     }
    // }

    return neatDay
}

export function readDate(dateToRead){
    let mm = dateToRead.split("-")[0];
    let dd = dateToRead.split("-")[1];
    let yyyy = dateToRead.split("-")[2];

    let suffix="th";
    let newMonth;
    let newDay = dd;

    if(mm.charAt(0)==="0"){
        mm=mm.charAt(1);
    }
  
    //not necessary because date not saving with 0 in front of 1-9
    if(dd.charAt(0)==="0"){
      newDay=dd.charAt(1);
    }
  

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

        default:
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

      default:
      break;
    }
    
    // return(newMonth+" "+newDay+suffix+", "+yyyy)
    return(`${newMonth} ${newDay+suffix}, ${yyyy}`)
}

