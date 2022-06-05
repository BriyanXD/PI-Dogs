import React from 'react';
import image from "../assets/img/error404.png"
import Style from "../css/Error404.module.css"

class Error404 extends React.Component{
    render(){
        return(
            <div className={Style.contenedor}>
                <img src={image} alt='Error 404' />
            </div>
        )
    }
}

export default Error404