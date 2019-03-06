import React, { Component } from "react";
import {Col,Row} from "react-materialize";
import API from '../../utils/API'
import Select from 'react-select';
const $ = window.$;

// const testoptions = [
//     { value: 'chocolate', label: 'Chocolate' },
//     { value: 'strawberry', label: 'Strawberry' },
//     { value: 'vanilla', label: 'Vanilla' }
//   ]

class SelectInstructor extends Component{
    constructor (props) {
        super(props)
    }
    
    state={
        instructors:[]
    }
    
    componentDidMount=()=>{
        this.getAllInstructors();
        // $('select').formSelect();  
    }

    getAllInstructors=()=>{
        API.getInstructors()
        .then(res =>{
            let options=[]
            if(res.data.length>0){
                res.data.forEach((element,i) => {
                    options.push({
                        value:element._id,
                        label:`${element.firstName} ${element.lastName}`
                    })
                });
                this.setState({ 
                    instructors: options 
                })
            }
            // console.log(JSON.stringify(res.data))
        })
        .catch(err => console.log(err));
    }

    render (){
        return(
            <Select placeholder="Add Instructors" closeMenuOnSelect={false} onChange={this.props.onChange} isMulti id="instructorSelect" options={this.state.instructors}/>
        )
    }
}

export default SelectInstructor