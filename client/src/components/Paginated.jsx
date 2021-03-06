import React from "react";
import {connect} from "react-redux"
import { dogNumberForPagination } from "../action";
import Page from "./page";

class Paginated extends React.Component{

   renderPages =() => {
       return this.props.numPages.map(page => {
           return <Page value={page} key={page}/>
       })
   }

    render(){
        return(
            <div>
                {this.props.lengthDogs ? this.renderPages():<></>}
            </div>
        )
    }
}
const mapSateToProps = (state) => {
    return {
        lengthDogs: state.dogs_length,
        numPages: state.numPages
    }
}
export default connect(mapSateToProps, {dogNumberForPagination})(Paginated);