import React, {useState, useEffect, useCallback} from 'react'
import "../css/App.css";
import Images from "../utils/images";

const Hand = ({cards,fetchCards,socket}) => {


    const [hand, setHand] = useState([]);

    socket.once('fetchCards',async () => {
        const cards = await fetchCards()
        console.log('cards',cards)
        await socket.emit('cards', cards)
        socket.once('hand', (hand) => {
            setHand(hand)
        })
    })

    /*const [hand1, setHand1] = useState([]);
    const [hand2, setHand2] = useState([]);
    const [hand3, setHand3] = useState([]);
    const [hand4, setHand4] = useState([]);

    const twoPlayersGame = useCallback((colorP1,colorP2) => {
        let cardsP1 = cards?.filter((c)=>c.color===`${colorP1}`)
        let cardsP2 = cards?.filter((c)=>c.color===`${colorP2}`)
        setHand1(shuffleCards(cardsP1))
        setHand2(shuffleCards(cardsP2))
    },[cards])

    const threePlayersGame = (colorP1,colorP2,colorP3,neutralColor) => {

        const cardsP1 = cards?.filter((c)=>c.color===`${colorP1}`)
        const cardsP2 = cards?.filter((c)=>c.color===`${colorP2}`)
        const cardsP3 = cards?.filter((c)=>c.color===`${colorP3}`)
        const neutralCards = cards?.filter((c)=>c.color===`${neutralColor}`)

        const shuffledNeutral = shuffleCards(neutralCards)

        let addNeutralCards1 = shuffledNeutral.filter((c,idx)=>idx<6?c:undefined)
        let addNeutralCards2 = shuffledNeutral.filter((c,idx)=>idx>5 && idx<12?c:undefined)
        let addNeutralCards3 = shuffledNeutral.filter((c,idx)=>idx>11 && idx<18?c:undefined)

        setHand1(shuffleCards([...cardsP1,...addNeutralCards1]))
        setHand2(shuffleCards([...cardsP2,...addNeutralCards2]))
        setHand3(shuffleCards([...cardsP3,...addNeutralCards3]))
    }

    const fourPlayersSoloGame = (colorP1,colorP2,colorP3,colorP4) => {
        const cardsP1 = cards?.filter((c)=>c.color===`${colorP1}`)
        const cardsP2 = cards?.filter((c)=>c.color===`${colorP2}`)
        const cardsP3 = cards?.filter((c)=>c.color===`${colorP3}`)
        const cardsP4 = cards?.filter((c)=>c.color===`${colorP4}`)
        setHand1(shuffleCards(cardsP1))
        setHand2(shuffleCards(cardsP2))
        setHand3(shuffleCards(cardsP3))
        setHand4(shuffleCards(cardsP4))
    }

    const fourPlayersTeamGame = (colorP1,colorP2) => {
        const cardsT1 = cards?.filter((c)=>c.color===`${colorP1}`)
        const cardsT2 = cards?.filter((c)=>c.color===`${colorP2}`)

        setHand1(shuffleCards(cardsT1).filter((c,idx)=>idx<9?c:undefined))
        setHand2(shuffleCards(cardsT2).filter((c,idx)=>idx<9?c:undefined))
        setHand3(shuffleCards(cardsT1).filter((c,idx)=>idx>8?c:undefined))
        setHand4(shuffleCards(cardsT2).filter((c,idx)=>idx>8?c:undefined))
    }
*/
    /*const removeCard = (event, hand, id) => {
        const cardId = event.dataTransfer.getData("cardId")
        const newHand = hand.filter((c)=>c._id!==cardId);
        if(id==='hand1') setHand1(newHand)
        if(id==='hand2') setHand2(newHand)
        if(id==='hand3') setHand3(newHand)
        if(id==='hand4') setHand4(newHand)
    }*/

    const removeCard = (event) => {
        const cardId = event.dataTransfer.getData("cardId")
        const newHand = hand.filter((c)=>c._id!==cardId);
        setHand(newHand)
    }



/*    const shuffleCards = (hand) => {
        hand.forEach((_, index) => {
            const randomIndex = Math.floor(Math.random() * (index + 1));
            [hand[index], hand[randomIndex]] = [hand[randomIndex], hand[index]];
        });
        return hand;
    }*/

    const flipTopCard = useCallback((hand, playerNb) => {
        return (
            <img
                key={hand[0]?._id}
                src={hand[0]?.image}
                className={`card${hand[0]?.color}`}
                onDragStart={event => {
                    event.dataTransfer.setData("cardId", hand[0]?._id)
                }}
                onDragEnd={event => {
                    removeCard(event)
                }}
                draggable={true}
            />)
    }, [hand])


    return (
        <div>
            {flipTopCard(hand, 'hand1')}
        </div>
    )
};


export default Hand;