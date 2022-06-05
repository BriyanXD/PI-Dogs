import Paginated from "./Paginated";
import FormOfCreation from "./FormOfCreation";
import React from 'react';
import Style from "../css/Footer.module.css"


class Footer extends React.Component{


render(){
    return(
        <footer className={Style.footer}>
              {/* Detalle de la raza */}
                 <FormOfCreation/>
                {/* Paginado */}
                <Paginated/>
        </footer>
    )
}



}

export default Footer