import React, { Component } from "react";
import {Col,Row} from "react-materialize";
import API from '../../utils/API'


class SelectInstructor extends Component{
      constructor (props) {
          super(props)
      
this.state={
        instructors:[]
    }

this.componentDidMount=()=>{
        this.getAllInstructors();
    }

this.getAllInstructors=()=>{
        API.getInstructors()
        .then(res =>{ this.setState({ instructors: res.data })
            console.log(JSON.stringify(res.data))
        })
        
        .catch(err => console.log(err));
    }
}
 render (){
    return(
        <Row>
            <Col>
       <form>
           <label>Select Instructor</label>
       <div className="input-field col s12">
    <select multiple>
      <option value="" >Choose your option</option>
     
        {
            this.state.instructors.map((currentInstructor,i)=>{
                return <option key={currentInstructor.id} value="1">{currentInstructor.firstName}, {currentInstructor.lastName}</option>
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