import Paginated from "./Paginated";
import FormOfCreation from "./FormOfCreation";
import React from 'react';


class Footer extends React.Component{


render(){
    return(
        <footer>
              {/* Detalle de la raza */}
                 <FormOfCreation/>
                {/* Paginado */}
                <Paginated/>
        </footer>
    )
}



}

export default Footer