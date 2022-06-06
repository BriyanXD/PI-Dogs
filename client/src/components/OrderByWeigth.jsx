import React from 'react';
import { connect } from 'react-redux';
import { ordenByWeigthtAction, dogNumberForPagination, cutForPaging } from '../action';
import Style from "../css/FilterTemp.module.css"
/* import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faArrowDownShortWide} from "@fortawesome/free-solid-svg-icons" */
import sort from "../assets/img/sort.png"

class OrderByWeigth extends React.Component{
    constructor(props){
        super(props)
        this.state={
            typeOrder:""
        }
    }

    handlerChange = async(value) => {
        await this.setState({
            typeOrder:value
        })
       await this.props.ordenByWeigthtAction(this.state.typeOrder)
       await this.props.dogNumberForPagination(this.props.dogLength)
       await this.props.cutForPaging(1)
    }

    render(){
        return(
            <div className={Style.contenedor}>
                {/* <FontAwesomeIcon icon={faArrowDownShortWide} className={Style.icon}/> */}
                <img src={sort} alt="sort" className={Style.icon}/>
                <select className={Style.select} name="OrderByWeigth" onChange={(e) => this.handlerChange(e.target.value)}>
                    <option className={Style.option} value="min">min</option>
                    <option className={Style.option} value="max">max</option>
                </select>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        dogLength : state.dogs_length
    }
}

export default connect(mapStateToProps,{ordenByWeigthtAction,dogNumberForPagination,cutForPaging})(OrderByWeigth)