import React, { Component } from "react";
import "./../registerStudentForm/registerStudent.css";
import PageContainer from "../../components/pageContainer";
import API from "../../utils/API";


class Register extends Component {
    constructor(props){
        super(props);
    
    
        this.state={
            students: [],
            firstName: "",
            lastName: "",
            email: "",
            phone: ""
        }

        this.handleFirstNameChange=this.handleFirstNameChange.bind(this)

        this.handleLastNameChange=this.handleLastNameChange.bind(this)

        this.handleEmailChange=this.handleEmailChange.bind(this)

        this.handlePhoneChange=this.handlePhoneChange.bind(this)

        this.handleOnSubmit=this.handleOnSubmit.bind(this)
        
        // getAllStudents=()=>{
        //     API.getAllStudents()
        //         .then(res => this.setState({ students: res.data }))
        //         .catch(err => console.log(err));
        // }

    }

    handleFirstNameChange(e) {
        e.preventDefault()
        this.setState({
            firstName: e.target.value
        })
        console.log(this.state.firstName)
    }

    handleLastNameChange(e) {
        e.preventDefault()
        this.setState({
            lastName: e.target.value
        })
        console.log(this.state.lastName)
    }

    handleEmailChange(e) {
        e.preventDefault()
        this.setState({
            email: e.target.value
        })
        console.log(this.state.email)
    }

    handlePhoneChange(e) {
        e.preventDefault()
        this.setState({
            phone: e.target.value
        })
        console.log(this.state.phone)
    }

    handleOnSubmit(e) {
        e.preventDefault()
        // console.log("submit")
        // console.log(e.target.value)
        var newStudent = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            phone: this.state.phone
        }
        console.log(newStudent)
        //make an axios.post method
        //axios.post(localhost:3001/api/students, newStudent)
    }

    componentDidMount=()=>{
        console.log("All Students: " + this.state.students)
    }


    render(){
        return(
            <div className="row" id="collapDiv"> 
                <div className="col s12 m6">
                    <ul className="collapsible expandable">        
                        <li>
                            <div className="collapsible-header" id="header1"><i className="material-icons">person_add</i>Existing Student</div>
                            
                            <div className="collapsible-body"><span>blah blah blah</span></div>
                        </li>

                        <li>
                            <div className="collapsible-header" id="header2"><i className="material-icons">person_add</i>New Student</div>

                            <div className="collapsible-body">
                                <span>
                                    <div class="row">
                                        <form class="col s12" onSubmit={this.handleOnSubmit}>
                                            <div class="row">
                                                <div class="input-field col s6">
                                                    <i class="material-icons prefix">account_circle</i>
                                                    <input id="fName" type="text" placeholder="First Name" onChange={this.handleFirstNameChange}></input>
                                                </div>

                                                <div class="input-field col s6">
                                                    <i class="material-icons prefix">account_circle</i>
                                                    <input id="lName" type="text" placeholder="Last Name" onChange={this.handleLastNameChange}></input>
                                                </div>
                                            </div>    

                                            <div class="row">
                                                <div class="input-field col s6">
                                                    <i class="material-icons prefix">email</i>
                                                    <input id="email" type="text" placeholder="Email" onChange={this.handleEmailChange}></input>
                                                </div>

                                                <div class="input-field col s6">
                                                    <i class="material-icons prefix">phone</i>
                                                    <input id="phone" type="text" placeholder="Phone" onChange={this.handlePhoneChange}></input>
                                                </div>
                                            </div>
                                        </form>  
                                    </div>
                                </span>
                            </div>
                        </li>
                    </ul>
                <button className="btn waves-effect waves-light" id="submit-btn" type="submit" name="action">Submit<i class="material-icons right">send</i></button>        
                </div>
            </div>    
        )

    }

}

export default Register