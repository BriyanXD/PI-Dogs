import React from "react";
import { connect } from "react-redux";
import { getDogs } from "../action";
import Card from "./Card"
import SearchBar from "./SearchBar";
import FiterTemp from "./FiterTemp";


class Cards extends React.Component{
   /*  constructor(props){
        super(props);
        this.state={
            isLoading : false
        }
    } */
    componentDidMount(){
         this.props.getDogs()
    }

    renderDogs(){
       return this.props.getInfo.map(dog => {
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
                {this.props.getInfo.length > 0 ?this.renderDogs() : this.props.getInfo.error ? <h2>Error 404</h2> : <h2>Loading</h2>}
            </main>
        )
    }
}
const mapSateToProps = (state) => {
    return {
        getInfo: state.dogs
    }
}

export default connect(mapSateToProps, {getDogs})(Cards);
