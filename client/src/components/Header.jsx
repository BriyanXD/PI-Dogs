import React from 'react';
import FilterDBorAPI from "./FilterDBorAPI";
import OrderByAlphabet from "./OrderByAlphabet";
import OrderByWeigth from "./OrderByWeigth";
import PageOfDetail from "./PageOfDetail";
import SearchBar from "./SearchBar";
import FiterTemp from "./FiterTemp";


class Header extends React.Component{


render(){
    return(
        <header>
                {/* Barra de busqueda */}
                <SearchBar/>
                {/* Filtros */}
                <FiterTemp/><FilterDBorAPI/><OrderByAlphabet/><OrderByWeigth/>
                <PageOfDetail/>
        </header>
    )
}



}

export default Header