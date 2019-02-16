import React, { Component } from "react";
import Pagecontainer from "../components/pageContainer/index"
import API from "../utils/API"

class instructors extends Component{
    state={
        instructors:[]
    }

    componentDidMount(){
        this.getInstructors();
    }

    getInstructors=()=>{

        API.getAllInstructors()
            .then(res => this.setState({ instructors: res.data }))
            .catch(err => console.log(err));
    
    }

    render(){
        return(
            <Pagecontainer>
                <h1>All instructors</h1>
                <h2>Number of instructors: {this.state.instructors.length}</h2>
                <ul className="collection">
                    {
                        this.state.instructors.map((current,i)=>{
                            return(
                                <li key={i} className="collection-item">{JSON.stringify(current)}</li>
                            )
                        })
                    }
                </ul>
            </Pagecontainer>
        )
    }
}

export default instructors;