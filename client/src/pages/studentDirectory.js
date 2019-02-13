import React, { Component } from "react";
import Sidenav from "../components/sidenav/sidenav";
import Pagecontainer from "../components/pageContainer"
import API from "../utils/API"

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
            <Pagecontainer>
                <h1>All Students</h1>
                <h2>Number of students: {this.state.students.length}</h2>
                <ul className="collection">
                    {
                        this.state.students.map((current,i)=>{
                        return (
                            <li key={i} className="collection-item">{JSON.stringify(current)}</li>
                        )
                        })
                    }
                </ul>
                {/* <Sidenav /> */}
            </Pagecontainer>
        )
    }
}

export default Home;