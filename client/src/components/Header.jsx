import React from 'react';
import FilterDBorAPI from "./FilterDBorAPI";
import OrderByAlphabet from "./OrderByAlphabet";
import OrderByWeigth from "./OrderByWeigth";
import PageOfDetail from "./PageOfDetail";
import SearchBar from "./SearchBar";
import FiterTemp from "./FiterTemp";
import Style from "../css/Header.module.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faFileCirclePlus,faDog} from "@fortawesome/free-solid-svg-icons"
import { switchVisibleCreation } from '../action';
import { connect } from 'react-redux';

class Header extends React.Component{

handlerClick = () => {
    this.props.switchVisibleCreation(true)
}

render(){
    return(
        <header className={Style.header}>
                <FontAwesomeIcon icon={faDog} className={Style.icon}/>
                {/* Barra de busqueda */}
            <div className={Style.elementos}>
                 <SearchBar/>
                {/* Filtros */}
                <FiterTemp/><FilterDBorAPI/><OrderByAlphabet/><OrderByWeigth/>
                {/* Pagina de detalle */}
                <PageOfDetail/>
                <button className={Style.btn} onClick={this.handlerClick} ><FontAwesomeIcon icon={faFileCirclePlus} className={Style.new}/></button>
            </div>
        </header>
    )
}

}

export default connect(null,{switchVisibleCreation})(Header)