import React from "react";
import { filterByDBorAPI, cutForPaging, dogNumberForPagination} from "../action";
import { connect } from "react-redux"


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
            <select name="filterDBorAPI" onChange={(e) => {this.handleChange(e.target.value)}}>
                <option value="all">All</option>
                <option value="api">API</option>
                <option value="db">DB</option>
            </select>
        )
    }
}

const mapSstateToProps = (state) => {
    return{
        lengthDogs: state.dogs_length
    }
}

export default connect(mapSstateToProps,{filterByDBorAPI,cutForPaging,dogNumberForPagination})(FilterDBorAPI);