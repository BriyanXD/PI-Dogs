import React from "react";
import { connect } from "react-redux";
import { getDogs } from "../action";
import Card from "./Card"
import SearchBar from "./SearchBar";
import FiterTemp from "./FiterTemp";
import Paginated from "./Paginated";
import { dogNumberForPagination } from "../action";
import { cutForPaging } from "../action";

class Cards extends React.Component{
   /*  constructor(props){
        super(props);
        this.state={
            isLoading : false
        }
    } */
    async componentDidMount(){
         await this.props.getDogs()
         await this.props.dogNumberForPagination(this.props.lengthDogs)
         await this.props.cutForPaging(1)
    }

    renderDogs(){
       return this.props.cutArrayDogs.map(dog => {
            if(dog.createdDB){
                return <Card name={dog.name} key={dog.id} createdb={this.props.createdDB} image={dog.image}/>
            }else{
                return <Card name={dog.name} key={dog.id} createdb={this.props.createdDB} image={dog.image.url}/>
            }
        })
    }
    render(){
        return(
            <main>
                <SearchBar/>
                <FiterTemp/>
                {this.props.cutArrayDogs.length > 0 ?this.renderDogs() : this.props.getInfo.error ? <h2>Error 404</h2> : <h2>Loading</h2>}
                <Paginated/>
            </main>
        )
    }
}
const mapSateToProps = (state) => {
    return {
        cutArrayDogs: state.cutArrayDogs,
        getInfo: state.dogs,
        lengthDogs: state.dogs_length,
    }
}

export default connect(mapSateToProps, {getDogs,dogNumberForPagination, cutForPaging})(Cards);
