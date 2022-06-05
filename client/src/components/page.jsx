import React from "react";
import { cutForPaging } from "../action";
import { connect } from "react-redux";
import Style from "../css/Page.module.css"


class Page extends React.Component{
    handlerClick = (value) => {
        this.props.cutForPaging(value)
    }


    render(){
        return(
            <button className={Style.pagina} onClick={() => {this.handlerClick(this.props.value)}}>{this.props.value}</button>
    )
}


}




export default connect(null,{cutForPaging})(Page);