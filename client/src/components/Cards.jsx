import React from "react";
import { connect } from "react-redux";
import { getDogs,dogNumberForPagination,cutForPaging } from "../action";
import Card from "./Card"
import SearchBar from "./SearchBar";
import FiterTemp from "./FiterTemp";
import Paginated from "./Paginated";
import FilterDBorAPI from "./FilterDBorAPI";
import OrderByAlphabet from "./OrderByAlphabet";

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
                let temps = dog.temperaments.reduce((acumulador, element) => {
                    acumulador = acumulador +element.name+","
                    return acumulador
                },[])
                return <Card name={dog.name} key={dog.id} createdb={this.props.createdDB} image={dog.image} temperaments={temps}/>
            }else{
                return <Card name={dog.name} key={dog.id} createdb={this.props.createdDB} image={dog.image.url} temperaments={dog.temperaments}/>
            }
        })
    }
    render(){
        return(
            <main>
                {/* Barra de busqueda */}
                <SearchBar/>
                {/* Filtros */}
                <FiterTemp/><FilterDBorAPI/><OrderByAlphabet/>
                {/* Se cargan las tarjeas con la informacion */}
                {this.props.cutArrayDogs.length > 0 && !this.props.getInfo.error?this.renderDogs() : this.props.getInfo.error ? <h2>Error 404</h2> : <h2>Loading</h2>}
                {/* Paginado */}
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
