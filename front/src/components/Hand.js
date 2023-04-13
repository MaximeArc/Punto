import React, {useCallback, useEffect, useState} from 'react'
import "../css/App.css";

const Hand = ({fetchCards,socket}) => {


    const [hand, setHand] = useState([]);

    socket.once('gameOver',() => {
        setHand([])
    })

    socket.on('fetchCards',async () => {
        const cards = await fetchCards()
        await socket.emit('cards', cards)
        socket.once('hand', (hand) => {
            setHand(hand)
        })

    })


    const removeCard = (event) => {
        const cardId = event.dataTransfer.getData("cardId")
        const newHand = hand.filter((c)=>c._id!==cardId);
        setHand(newHand)
    }

    return (
        <div>
            {hand[0] &&
                <img
                    key={hand[0]._id}
                    src={hand[0].image}
                    className={`card${hand[0].color}`}
                    onDragStart={event => {
                        event.dataTransfer.setData("cardId", hand[0]._id)
                    }}
                    onDragEnd={event => {
                        removeCard(event)
                    }}
                    draggable={true}
                    alt={'Card'}
                />
            }
        </div>
    );


};


export default Hand;