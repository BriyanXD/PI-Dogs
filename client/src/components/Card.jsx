import React from "react";
import { connect } from "react-redux";
import { switchVisibleDetail } from "../action";
import Style from "../css/Card.module.css"

class Card extends React.Component{
    handlerClick = async () => {
        await this.props.switchVisibleDetail(true, this.props.id)
    }

    render(){
        return(
            <div className={Style.carDog} onClick={this.handlerClick}>
                 <img src={this.props.image} alt={this.props.name} width={400} height={240} className={Style.image}/>
                 <div className={Style.text}>
                    <h3>{this.props.name}</h3>
                    <p className={Style.textsec}>Temperamentos: {this.props.temperaments}</p>
                    <p className={Style.textsec}>Peso: {this.props.weight} lib.</p>
                 </div>
            </div>
        )
    }
}

export default connect(null,{switchVisibleDetail})(Card);