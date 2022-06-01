import React from "react";
import { orderByAlphabet, cutForPaging, dogNumberForPagination } from "../action";
import { connect } from "react-redux";

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
        await this.props.orderByAlphabet(this.state.typeOrder)
        await this.props.dogNumberForPagination(this.props.lengthDogs)
        await this.props.cutForPaging(1)
    }
    render(){
        return(
            <select name="OrderByAlphabet" onChange={(e) => this.handlerChange(e.target.value)}>
                <option value="AaZz">Aa - Zz</option>
                <option value="ZzAa">Zz - Aa</option>
            </select>
        )
    }
}

const mapSateToProps = (state) => {
    return{
        lengthDogs: state.dogs_length
    }
}

export default connect(mapSateToProps,{orderByAlphabet,cutForPaging,dogNumberForPagination})(OrderByAlphabet);