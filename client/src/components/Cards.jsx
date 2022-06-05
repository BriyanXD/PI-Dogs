import React from "react";
import { connect } from "react-redux";
import { getDogs,dogNumberForPagination,cutForPaging } from "../action";
import Card from "./Card"
import Footer from "./Footer";
import Header from "./Header";
import Error404 from "./Error404";
import Loading from "./Loading"
import Style from "../css/Cards.module.css"

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
            <>
            <Header/>
             <main className={Style.contenedorPrincipal}>
                {/* Se cargan las tarjeas con la informacion */}
                {this.props.cutArrayDogs.length > 0 && !this.props.getInfo.error?this.renderDogs() : this.props.getInfo.error ? <Error404/> : <Loading/>}
            </main>
{/*             <Footer/> */}
            <Footer/>
            </>
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
