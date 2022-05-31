import React from "react";
import { cutForPaging } from "../action";
import { connect } from "react-redux";


class Page extends React.Component{
    handlerClick = (value) => {
        this.props.cutForPaging(value)
    }


    render(){
        return(
            <button onClick={() => {this.handlerClick(this.props.value)}}>{this.props.value}</button>
    )
}


}




export default connect(null,{cutForPaging})(Page);