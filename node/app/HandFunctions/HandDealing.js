const shuffleCards = (hand) => {
    console.log('hand-shuffle',hand)
    hand.forEach((_, index) => {
        const randomIndex = Math.floor(Math.random() * (index + 1));
        [hand[index], hand[randomIndex]] = [hand[randomIndex], hand[index]];
    });
    return hand;
}

const twoPlayersGame = (cards, color) => {
    //let cardsP2 = cards?.filter((c)=>c.color==="Red")
    return cards?.filter((c) => c.color === color)
}

const threePlayersGame = (cards, color) => {

    const cardsP1 = cards?.filter((c)=>c.color===color)
    const neutralCards = cards?.filter((c)=>c.color===color)

    const shuffledNeutral = shuffleCards(neutralCards)

    let addNeutralCards = shuffledNeutral.filter((c,idx)=>idx<6?c:undefined)
    /*let addNeutralCards2 = shuffledNeutral.filter((c,idx)=>idx>5 && idx<12?c:undefined)
    let addNeutralCards3 = shuffledNeutral.filter((c,idx)=>idx>11 && idx<18?c:undefined)*/

    return shuffleCards([...cardsP1,...addNeutralCards])
        /*shuffleCards([...cardsP2,...addNeutralCards2]),
        shuffleCards([...cardsP3,...addNeutralCards3])*/

}

const fourPlayersSoloGame = (cards, color) => {
/*    const cardsP1 = cards?.filter((c)=>c.color==="Blue")
    const cardsP2 = cards?.filter((c)=>c.color==="Red")
    const cardsP3 = cards?.filter((c)=>c.color==="Yellow")
    const cardsP4 = cards?.filter((c)=>c.color==="Green")
    return [shuffleCards(cardsP1),shuffleCards(cardsP2),shuffleCards(cardsP3),shuffleCards(cardsP4)]*/
    return cards?.filter((c) => c.color === color)
}

const fourPlayersTeamGame = (cards, color) => {
    const cardsT1 = cards?.filter((c)=>c.color===color)
    const cardsT2 = cards?.filter((c)=>c.color===color)
    return [
        shuffleCards(cardsT1).filter((c,idx)=>idx<9?c:undefined),
        shuffleCards(cardsT2).filter((c,idx)=>idx<9?c:undefined),
        shuffleCards(cardsT1).filter((c,idx)=>idx>8?c:undefined),
        shuffleCards(cardsT2).filter((c,idx)=>idx>8?c:undefined)
    ]
}

const playGame = (cards, numPlayers, color) => {
    switch (numPlayers) {
        case 2:
            return twoPlayersGame(cards, color);
        case 3:
            return threePlayersGame(cards, color);
        case 4:
             return fourPlayersSoloGame(cards, color);
        default:
            throw new Error(`Invalid number of players: ${numPlayers}`);
    }
}
module.exports ={playGame}
