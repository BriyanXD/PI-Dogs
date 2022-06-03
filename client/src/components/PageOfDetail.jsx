import React from 'react';
import { connect } from 'react-redux';
import { switchVisibleDetail } from '../action';


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
            <div>
                <div><h1>{name}</h1></div>
                <div>
                    {image.url?<img src={image.url} alt={name} weight={100} height={100 }/>:
                    <img src={image} alt={name} weight={100} height={100 }/>}
                </div>
                <div>
                    <p>Altura : {height}</p>
                    <p>Peso : {weight}</p>
                    <p>Vida : {life_span}</p>
                    {!createdDB ?<p>Temperamentos : {temperaments}</p>:
                        <p>Temperamentos: {temps}</p>
                    }
                </div>
            </div>
        )
        }else{
        }
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