import React from 'react';
import image from "../assets/img/loading.svg"
import Style from "../css/Error404.module.css"

class Error404 extends React.Component{
    render(){
        return(
            <div className={Style.contenedor}>
                <img className={Style.imagen} src={image} alt='Loading' />
            </div>
        )
    }
}

export default Error404