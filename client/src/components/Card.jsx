import React from "react";

function Card(props){
    return(
        <div className="card-dog">
            <h3>{props.name}</h3>
                <img src={props.image} alt={props.name} width={400} height={240}/>
        </div>
    )
}

export default Card;