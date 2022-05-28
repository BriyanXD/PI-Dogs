import React from "react";
import { connect } from "react-redux";
import { searchDog } from "../action";


class SearchBar extends React.Component{
    constructor(props){
        super(props)
       this.state={
           nameRace:""
       }
    }
    async findRace(value){
            await this.setState({ nameRace: value})
            this.props.searchDog(this.state.nameRace)
    }
    render(){
        return(
            <div>
                <input type="text" onChange={(e)=> {this.findRace(e.target.value)}} placeholder="Buscar por raza..."/>
            </div>
        )
    }
}





export default connect(null, {searchDog})(SearchBar);