import React from "react";
import {Link} from "react-router-dom"

class Landing extends React.Component{
    render(){
        return(
            <div>
                <h1>DOG API</h1>
                <Link to="/home">
                <button>INGRESAR</button>
                </Link>
            </div>
        )
    }
}

export default Landing;