import React from 'react';
import { connect } from 'react-redux';
import { switchVisibleDetail } from '../action';


class PageOfDetail extends React.Component{

    handlerClick = () => {
        this.props.switchVisibleDetail(false)
    }


    renderPageOfDetail = () => {
        const {name, weight,height,temperaments,image,life_span} = this.props.infoDetail[0]
        return(
            <div>
                <div><h1>{name}</h1></div>
                <div>
                    <img src={image.url} alt={name} weight={100} height={100 }/>
                </div>
                <div>
                    <p>Altura : {height}</p>
                    <p>Peso : {weight}</p>
                    <p>Vida : {life_span}</p>
                    <p>Temperamentos : {temperaments}</p>
                </div>
            </div>
        )
    }


    render(){
        return(
            <h1>
                {this.renderPageOfDetail()}
            </h1>
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