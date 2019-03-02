
import React, { Component } from "react";
import {Col,Row} from "react-materialize";
import API from '../../utils/API'


class SelectStudent extends Component{
      constructor(props){
          super(props)
      
    this.state={
        students:[]
    }

    this.componentDidMount=()=>{
        this.getAllStudents();
    
    }
    this.getAllStudents = ()=> {
        API.getAllStudents()
        .then(res =>{ this.setState({ students: res.data })
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
           <label>Select Students</label>
       <div class="input-field col s12">
    <select multiple>
      <option value="">Choose your option</option>
     
        {
            this.state.students.map((current,i)=>{
                return <option key={current.id} value="1">{current.firstName}, {current.lastName}</option>
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
export default SelectStudent
