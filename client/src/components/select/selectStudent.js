import React from "react";
import {Col,Row} from "react-materialize";


const SelectStudent =()=>{
    return(
        <Row>
            <Col>
       <form>
           <label>Select Student</label>
       <div class="input-field col s12">
    <select multiple>
      <option value="" disabled selected>Choose your option</option>
      <option value="1">Option 1</option>
      <option value="2">Option 2</option>
      <option value="3">Option 3</option>
    </select>
    
  </div>
  </form>
  </Col>
  </Row>
    )
}
export default SelectStudent