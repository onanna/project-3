
import React, { Component } from "react";
import {Col,Row} from "react-materialize";
import API from '../../utils/API'
const $=window.$;


class SelectStudent extends Component{
      constructor(props){
          super(props)
      
    this.state={
        students:[]
    }

    this.componentDidMount=()=>{
        $('select').formSelect();  
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
                <label>Select Students</label>
                
                    <div className="input-field col s12">
                        <select multiple onChange={this.props.onChange} name="selectStudents">
                        <option value="" defaultValue>Choose your option</option>
                        
                            {
                                this.state.students.map((current,i)=>{
                                    return <option key={current._id} accessKey={current._id} value={current.firstName}>{current.firstName}, {current.lastName}</option>
                                })
                            }
                        
                        </select>
                    </div>
            </Col>
        </Row>
    )
}
}
export default SelectStudent
