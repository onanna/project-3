import React from "react";
import {Col,Row} from "react-materialize";


const Select =()=>{
    return(
       <form>
     <label>Select Course Instructor</label>
        <div className="input-field col s12">
    <select>
      <option value="" disabled selected>Choose your option</option>
      <option value="1">Option 1</option>
      <option value="2">Option 2</option>
      <option value="3">Option 3</option>
    </select>
   
  </div>
  </form>
  
    )
}
export default Select