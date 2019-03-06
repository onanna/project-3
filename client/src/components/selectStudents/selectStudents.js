import React, { Component } from "react";
import API from '../../utils/API'
import Select from 'react-select';

class SelectStudent extends Component{
    
    state={
        students:[]
    }
    
    componentDidMount=()=>{
        this.getAllStudents();
        // $('select').formSelect();  
    }

    getAllStudents=()=>{
        API.getAllStudents()
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
                    students: options 
                })
            }
        })
        .catch(err => console.log(err));
    }

    render (){
        return(
            <Select placeholder="Add Students"closeMenuOnSelect={false} onChange={this.props.onChange} isMulti id="studentSelect" options={this.state.students}/>
        )
    }
}

export default SelectStudent