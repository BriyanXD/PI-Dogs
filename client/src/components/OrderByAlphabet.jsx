import React from "react";
import { orderByAlphabetAction, cutForPaging, dogNumberForPagination } from "../action";
import { connect } from "react-redux";
import Style from "../css/FilterTemp.module.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faArrowDownAZ} from "@fortawesome/free-solid-svg-icons"

class OrderByAlphabet extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            typeOrder: ""
        }
    }

    handlerChange = async (value) => {
        await this.setState({
            typeOrder:value
        })
        await this.props.orderByAlphabetAction(this.state.typeOrder)
        await this.props.dogNumberForPagination(this.props.lengthDogs)
        await this.props.cutForPaging(1)
    }
    render(){
        return(
            <div className={Style.contenedor}>
            <FontAwesomeIcon icon={faArrowDownAZ} className={Style.icon}/>
            <select className={Style.select} name="OrderByAlphabet" onChange={(e) => this.handlerChange(e.target.value)}>
                <option className={Style.option} value="AaZz">Aa - Zz</option>
                <option className={Style.option} value="ZzAa">Zz - Aa</option>
            </select>
            </div>
        )
    }
}

const mapSateToProps = (state) => {
    return{
        lengthDogs: state.dogs_length
    }
}

export default connect(mapSateToProps,{orderByAlphabetAction,cutForPaging,dogNumberForPagination})(OrderByAlphabet);