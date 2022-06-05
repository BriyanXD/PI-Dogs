import React from 'react';
import {connect} from "react-redux"
import {getTemperaments, filterByTemperament, dogNumberForPagination, cutForPaging} from "../action"
import Style from "../css/FilterTemp.module.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faFilter} from "@fortawesome/free-solid-svg-icons"

//el estado filter pendiente
class FilterTemp extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            tempSelect: "all"
        }
}
// Carga los temperamentos al estado de redux
// se carga solo cuando se renderiza el componente
componentDidMount(){
    this.props.getTemperaments()
}

//guardamos la opcion seleccionada en el estado local
async selectOption(name){
    await this.setState({
        tempSelect : name
    })
    await this.props.filterByTemperament(this.state.tempSelect)
    await this.props.dogNumberForPagination(this.props.lengthDogs)
    await this.props.cutForPaging(1)
}

//mapeamos el array que llega de redux para agregarlo al componenete
chargeTemps(){
    return this.props.temps.map(temp => {
       return <option className={Style.option} value={temp.name} key={temp.id}>{temp.name}</option>
    })
}

//renderizamos el componente
render(){
    return(
        <div className={Style.contenedor}>
        <FontAwesomeIcon icon={faFilter} className={Style.icon}/>
        <select className={Style.select} name="filterTemp" onChange={(e)=>{this.selectOption(e.target.value)}}>
            <option className={Style.option} value="all"> Temperaments all </option>
            {this.chargeTemps()}
        </select>
        </div>
    )
}
}
//Pasamos el estado de los temperamentos como parametro
const mapSstateToProps = (state) => {
    return{
        temps: state.temperaments,
        lengthDogs: state.dogs_length
    }
}

export default connect(mapSstateToProps,{getTemperaments,filterByTemperament, dogNumberForPagination, cutForPaging})(FilterTemp);