import React, { Component } from "react";
import {Col,Row} from "react-materialize";
import API from '../../utils/API'


class SelectInstructor extends Component{
      
    state={
        instructors:[]
    }

    componentDidMount=()=>{
        this.getAllInstructors();
    }

    getAllInstructors=()=>{
        API.getInstructors()
        .then(res => this.setState({ instructors: res.data }))
        .catch(err => console.log(err));
    }
    
 render (){
    return(
        <Row>
            <Col>
       <form>
           <label>Select Instructor</label>
       <div class="input-field col s12">
    <select multiple>
      <option value="" disabled selected>Choose your option</option>
     
        {
            this.state.instructors.map((currentInstructor,i)=>{
                return <option value="1">{currentInstructor.name}</option>
            })
        }
      
    </select>
    
  </div>
  </form>
  </Col>
  </Row>
    )
}
}
export default SelectInstructor