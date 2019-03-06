import React, { Component } from "react";
import API from '../../utils/API'
import Select from 'react-select';

class sendAttendance extends Component{

    state={
        instructors:[],
        sentSuccess:false,
        error:''
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
                    if(element.phone){
                        options.push({
                            value:element.phone,
                            label:`${element.firstName} ${element.lastName}`
                        })
                    }
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
        this.setState({error:''})

        let dataToSend={
            number:this.chosen.value,
            urlToSend:this.props.attendLink
        }
        API.sendAttendanceForm(dataToSend)
        .then(result=>{
            if(result.data.success){
                this.setState({sentSuccess:true})
            }else{
                this.setState({error:result.data.error})
            }
        })
    }


    render (){
        if(!this.state.sentSuccess){
            return(

                <div>
                    <div className='row'>
                        <div className='col s12'>
                            <Select placeholder="Choose Instructor..." onChange={this.onChange} id="sendAttendanceSelect" options={this.state.instructors}/>
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
        }else{
            return(
                <h4 className='light flow-text'>Attendance Sent</h4>
            )
        }
    }
}

export default sendAttendance;