import React from "react";
import { connect } from "react-redux";
import { getDogs,dogNumberForPagination,cutForPaging } from "../action";
import Card from "./Card"
import SearchBar from "./SearchBar";
import FiterTemp from "./FiterTemp";
import Paginated from "./Paginated";
import FilterDBorAPI from "./FilterDBorAPI";
import OrderByAlphabet from "./OrderByAlphabet";
import OrderByWeigth from "./OrderByWeigth";
import PageOfDetail from "./PageOfDetail";
import FormOfCreation from "./FormOfCreation";

class Cards extends React.Component{
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
                return <Card name={dog.name} key={dog.id} createdb={dog.createdDB} image={dog.image} temperaments={temps} weight={dog.weight}/>
            }else{
                return <Card name={dog.name} key={dog.id} image={dog.image.url} temperaments={dog.temperaments}  weight={dog.weight}/>
            }
        })
    }
    render(){
        return(
            <main>
                {/* Barra de busqueda */}
                <SearchBar/>
                {/* Filtros */}
                <FiterTemp/><FilterDBorAPI/><OrderByAlphabet/><OrderByWeigth/>
                {/* Se cargan las tarjeas con la informacion */}
                {this.props.cutArrayDogs.length > 0 && !this.props.getInfo.error?this.renderDogs() : this.props.getInfo.error ? <h2>Error 404</h2> : <h2>Loading</h2>}
                {/* Detalle de la raza */}
                <PageOfDetail/>
                {/* Formulario de creacion */}
                <FormOfCreation/>
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
