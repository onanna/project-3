import React, {Component} from "react";
import "./style.css";
import API from "../../utils/API";
const $ = window.$;

//going to accept instructor objects (for #), and function to send object

//instructor objects
//link
class sendAttendance extends Component{

    constructor(props){
        super(props)
    }

    componentDidMount=()=>{
        $('select').formSelect();          
    }   

    sendAttendanceForm=()=>{

        let chosen = document.getElementById('sendSelect').value
        console.log("chosen is "+chosen)
        let dataToSend={
            number:chosen,
            urlToSend:this.props.attendLink
        }
        // console.log(`url to send is `+JSON.stringify(dataToSend)s)

        API.sendAttendanceForm(dataToSend)
    }

    render(){
        return(
            <div className="row">
                <div className="col s8">
                    <div className="input-field">
                        <select id="sendSelect">
                            <option value="" disabled></option>
                             {
                                this.props.instructors.map((current,i)=>{
                                // this.test.map((current,i)=>{
                                    return <option value={current.phone} key={i}>{current.firstName} {current.lastName}</option>
                                })
                            }
                        </select>
                        <label>Select Instructor</label>
                    </div>
                </div>
                <div className="col s4">
                    <button onClick={this.sendAttendanceForm} className="btn-large waves-light" type="submit">
                        Send
                    </button>
                </div>
            </div>
        )
    }
}

export default sendAttendance;