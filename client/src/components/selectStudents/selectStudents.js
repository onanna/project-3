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

class SelectStudent extends Component{
    constructor (props) {
        super(props)
    }
    
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
            console.log('result of get students is '+JSON.stringify(res.data))
            let options=[]
            if(res.data.length>0){
                res.data.forEach((element,i) => {
                    console.log('inside this student')
                    console.log(JSON.stringify(element))
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
            <Select closeMenuOnSelect={false} onChange={this.props.onChange} isMulti id="studentSelect" options={this.state.students}/>
        )
    }
}

export default SelectStudent