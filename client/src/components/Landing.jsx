import React from "react";
import {Link} from "react-router-dom"
import Style from "../css/Landing.module.css"
import image from "../assets/img/dog-landing.svg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faDog} from '@fortawesome/free-solid-svg-icons'

class Landing extends React.Component{
    render(){
        return(
            <div className={Style.contenedorPrincipal}>
                <div>
                <p className={Style.title}><FontAwesomeIcon icon={faDog} /> DOG API</p>

                <p className={Style.text}>
                    Esta es una aplicacion que muesta una serie
                    de razas de perros. <br />
                    Por cada raza econtraras informacion de la mista
                </p>
                <Link to="/home">
                <button className={Style.btn}>INGRESAR</button>
                </Link>
                </div>
                <div className={Style.contenedorImage}>
                    <img src={image} alt="" className={Style.imagen}/>
                </div>
            </div>

        )
    }
}

export default Landing;