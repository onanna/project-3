import React from "react";
import "./style.css";

//going to accept instructor objects (for #), and function to send object

//submitFunction
//instructor objects
function sendAttendance(props){

    return(
        <div className="row">
            <div className="col s8">
                <div className="input-field col s12">
                    <select>
                        <option value="" disabled selected></option>
                        {
                            this.props.instructors.map((current,i)=>{
                                <option value={current._id} key={i}>{current.firstName} {current.lastName}</option>
                            })
                        }
                    </select>
                    <label>Select Instructor</label>
                </div>
            </div>
            <div className="col s4">
                <button onClick={props.submitFunction} className="btn-large waves-light" type="submit">
                    Send
                </button>
            </div>
        </div>
    )
}

export default sendAttendance;