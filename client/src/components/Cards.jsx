import React from "react";

class Cards extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            title: "HOLA"
        }
    } 
    render(){
        return(<h1>BIENVENIDO A LA API DOGS</h1>)
    }
}


export default Cards;
