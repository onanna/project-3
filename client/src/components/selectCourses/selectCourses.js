import React, { Component } from "react";
import API from '../../utils/API'
import Select from 'react-select';

class SelectCourses extends Component{
    
    state={
        courses:[]
    }
    
    componentDidMount(){
        API.getAllCourses(this.props.userId)
        .then(res => {
            let options=[]
            if(res.data.length>0){
                res.data.forEach((element,i) => {
                    options.push({
                        value:element._id,
                        label:`${element.name}`
                    })
                });
                this.setState({ 
                    courses: options 
                })
            }
        })
        .catch(err => console.log(err));
    }

    render (){
        return(
            <Select id='courseSelect' readonly="true" isSearchable={false} placeholder="Select Courses" isMulti closeMenuOnSelect={false} onChange={this.props.onChange} options={this.state.courses}/>
        )
    }
}

export default SelectCourses