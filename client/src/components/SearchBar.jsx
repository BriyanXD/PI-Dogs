import React from "react";
import { connect } from "react-redux";
import { searchDog } from "../action";
import { dogNumberForPagination, cutForPaging} from "../action";
import Style from "../css/SearchBar.module.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons"


class SearchBar extends React.Component{
    constructor(props){
        super(props)
       this.state={
           nameRace:""
       }
    }
    async findRace(value){
            await this.setState({ nameRace: value})
            await this.props.searchDog(this.state.nameRace)
            await this.props.dogNumberForPagination(this.props.lengthDogs)
            await this.props.cutForPaging(1)
    }
    render(){
        return(
            <div>
                <FontAwesomeIcon icon={faMagnifyingGlass} className={Style.icon} />
                <input className={Style.search} type="text" onChange={(e)=> {this.findRace(e.target.value)}} placeholder="Buscar por raza..."/>
            </div>
        )
    }
}

const mapSateToProps = (state) => {
    return{
        lengthDogs: state.dogs_length,
    }
}



export default connect(mapSateToProps, {searchDog, dogNumberForPagination, cutForPaging})(SearchBar);