import React, { Component } from "react";
import "./../registerStudentForm/registerStudent.css";
import PageContainer from "../../components/pageContainer";
import API from "../../utils/API";


class Register extends Component {
    state={
        students:{}

    }
  
    constructor(props){
        super(props);
        
        // getAllStudents=()=>{
        //     API.getAllStudents()
        //         .then(res => this.setState({ students: res.data }))
        //         .catch(err => console.log(err));
        // }

    }

    componentDidMount=()=>{
        console.log("All Students: " + this.state.students)
    }


    render(){

        return(
            <PageContainer>
                <div className="row"> 
                    <div className="col s12 m6">
                        <p><b>Instructor:</b> {this.state.students}</p>
                 
                    </div>
                </div>
            </PageContainer>    
        )

    }

}

export default Register