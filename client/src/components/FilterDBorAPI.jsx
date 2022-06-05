import React from "react";
import { filterByDBorAPI, cutForPaging, dogNumberForPagination} from "../action";
import { connect } from "react-redux"
import Style from "../css/FilterTemp.module.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faFilter} from "@fortawesome/free-solid-svg-icons"


class FilterDBorAPI extends React.Component{
    constructor(props){
        super(props)
        this.state={
            typeValue : ""
        }
    }

    handleChange = async (value) => {
        await this.setState({
            typeValue: value
        })
        await this.props.filterByDBorAPI(this.state.typeValue)
        await this.props.dogNumberForPagination(this.props.lengthDogs)
        await this.props.cutForPaging(1)
    }
    render(){
        return (
            <div className={Style.contenedor}>
            <FontAwesomeIcon icon={faFilter} className={Style.icon}/>
            <select className={Style.select} name="filterDBorAPI" onChange={(e) => {this.handleChange(e.target.value)}}>
                <option className={Style.option} value="all">By all creations</option>
                <option className={Style.option} value="api">API</option>
                <option className={Style.option} value="db">DB</option>
            </select>
            </div>
        )
    }
}

const mapSstateToProps = (state) => {
    return{
        lengthDogs: state.dogs_length
    }
}

export default connect(mapSstateToProps,{filterByDBorAPI,cutForPaging,dogNumberForPagination})(FilterDBorAPI);