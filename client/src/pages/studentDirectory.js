import React, { Component } from "react";
import Sidenav from "../components/sidenav/sidenav";
import API from "../utils/API"
import Sidebasic from "../components/sideBasic";

class Home extends Component{
    state={
        students:[]
    }

    componentDidMount(){
        this.getAllStudents();
    }

    getAllStudents=()=>{

        API.getAllStudents()
            .then(res => this.setState({ students: res.data }))
            .catch(err => console.log(err));
    
    }

    render(){
        return(
            <div>
                <h1>All Students</h1>
                <h2>Number of students: {this.state.students.length}</h2>
                <ul>
                    {
                        this.state.students.map((current,i)=>{
                        return (
                            <li key={i}>{JSON.stringify(current)}</li>
                        )
                        })
                    }
                </ul>
                <Sidenav />
            </div>
        )
    }
}

export default Home;