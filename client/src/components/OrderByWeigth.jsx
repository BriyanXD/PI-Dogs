import React from 'react';
import { connect } from 'react-redux';
import { ordenByWeigthtAction, dogNumberForPagination, cutForPaging } from '../action';

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
           <>
           {/* <label htmlFor="OrderByWeigth">Peso</label> */}
            <select name="OrderByWeigth" onChange={(e) => this.handlerChange(e.target.value)}>
                <option value="min">min</option>
                <option value="max">max</option>
            </select>
           </>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        dogLength : state.dogs_length
    }
}

export default connect(mapStateToProps,{ordenByWeigthtAction,dogNumberForPagination,cutForPaging})(OrderByWeigth)