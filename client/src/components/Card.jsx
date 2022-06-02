import React from "react";
import { connect } from "react-redux";
import { switchVisibleDetail } from "../action";

class Card extends React.Component{
    handlerClick = async () => {
        await this.props.switchVisibleDetail(true, this.props.name)
    }

    render(){
        return(
            <div className="card-dog" onClick={this.handlerClick}>
                <h3>{this.props.name}</h3>
                <img src={this.props.image} alt={this.props.name} width={400} height={240}/>
                <p>Temperamentos: {this.props.temperaments}</p>
                <p>Peso: {this.props.weight} lib.</p>
            </div>
        )
    }
}

export default connect(null,{switchVisibleDetail})(Card);