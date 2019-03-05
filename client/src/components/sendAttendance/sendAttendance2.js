import React, { Component } from "react";
import {Col,Row} from "react-materialize";
import API from '../../utils/API'
import Select from 'react-select';
const $ = window.$;

class sendAttendance extends Component{
    constructor (props) {
        super(props)
    }
    
    state={
        instructors:[]
    }

    chosen=''
    
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
                        value:element.phone,
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

    onChange=(selected)=>{
        this.chosen=selected
    }

    sendAttendanceForm=()=>{

        console.log("chosen is "+this.chosen)
        let dataToSend={
            number:this.chosen.value,
            urlToSend:this.props.attendLink
        }
        API.sendAttendanceForm(dataToSend)
    }


    render (){
        return(
            <div>
                <div className='row'>
                    <div className='col s12'>
                        <Select placeholder="Add Instructors" onChange={this.onChange} id="sendAttendanceSelect" options={this.state.instructors}/>
                    </div>
                </div>

                <div className='row'>
                    <div className='col s12'>
                        <button id='sendAttendButton' onClick={this.sendAttendanceForm} className="btn-large waves-light" type="submit">
                            Send
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default sendAttendance;