import React from 'react';
import { connect } from 'react-redux';
import { switchVisibleDetail } from '../action';
import Style from "../css/PageOfDetail.module.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faXmark} from "@fortawesome/free-solid-svg-icons"



class PageOfDetail extends React.Component{

    handlerClick = () => {
        this.props.switchVisibleDetail(false)
    }


    renderPageOfDetail = () => {
        if(this.props.infoDetail.length > 0){
            const {name, weight,height,temperaments,image,life_span, createdDB} = this.props.infoDetail[0]
            var temps = ""

            if(createdDB){
                temps = temperaments.reduce((acc, cur) => {
                    acc = acc + cur.name +","
                    return acc
                },"")
            }

        return(
            <div className={Style.contenedorGeneral}>

                <button className={Style.close} onClick={this.handlerClick}><FontAwesomeIcon  icon={faXmark}/></button>
                <div className={Style.contenedorInfo}>
                <div className={Style.title}><h1>{name}</h1></div>
                <div className={Style.divInfo}>
                <div className={Style.divDatos}>
                    <p>Altura : {height}</p>
                    <p>Peso : {weight}</p>
                    <p>Vida : {life_span}</p>
                    {!createdDB ?<p  >Temperamentos : {temperaments}</p>:
                    <p>Temperamentos: {temps}</p>
                    }
                </div>
                    {image.url?<img src={image.url} alt={name} className={Style.image}/>:
                    <img src={image} alt={name} className={Style.image}/>}
                </div>
                </div>
            </div>
        )
        }else{
        }
    }


    render(){
        return(
            <>
            {this.props.visibleDetail && this.renderPageOfDetail()}
            </>
        )
    }
}

const mapSateToProps = (state) => {
    return{
        visibleDetail: state.stateDetail.visibleDetail,
        infoDetail: state.stateDetail.infoDetail
    }
}

export default connect(mapSateToProps,{switchVisibleDetail})(PageOfDetail)