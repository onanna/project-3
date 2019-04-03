import React, { Component } from "react";
import API from '../../utils/API'
import Select from 'react-select';

class SelectInstructor extends Component{
    state={
        instructors:[]
    }

    componentDidMount(){
        API.getInstructors(this.props.userId)
        .then(res => {
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

    // getAllInstructors=()=>{
    //     API.getInstructors()
    //     .then(res =>{
    //         let options=[]
    //         if(res.data.length>0){
    //             res.data.forEach((element,i) => {
    //                 options.push({
    //                     value:element._id,
    //                     label:`${element.firstName} ${element.lastName}`
    //                 })
    //             });
    //             this.setState({ 
    //                 instructors: options 
    //             })
    //         }
    //     })
    //     .catch(err => console.log(err));
    // }

    render (){
        return(
            <Select readonly="true" isSearchable={false} placeholder="Add Instructors" isMulti closeMenuOnSelect={false} isSearchable={false} onChange={this.props.onChange} id="instructorSelect" options={this.state.instructors}/>
        )
    }
}

export default SelectInstructor