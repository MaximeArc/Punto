import React, {useState, useEffect} from 'react'
import "../css/App.css";


const Card = ({x,y,card}) => {
    return (
        <img
            key={`${x}-${y}`}
            className={`card${card[0].color} img-cell`}
            src={card[0].image}
            id={card[0]._id}
            value={card[0].value}
            color={card[0].color}>
        </img>
    )
};
export default Card;