import React, { Component } from "react";
import API from '../../utils/API'
import Select from 'react-select';

class SelectInstructor extends Component{
    state={
        instructors:[]
    }
    
    componentDidMount=()=>{
        this.getAllInstructors();
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