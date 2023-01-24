import "./App.css";
import React, {useState, useEffect, useCallback} from "react";
import Grid from "./Components/Grid";
import Title from "./Title.png";
import NewGame from "./NewGame.png";
import Images from "./utils/images"


export const App = () => {


    const [cards, setCard] = useState([])
    const [images, setImages] = useState([])

    useEffect(() => {
        fetchData();
    }, [])

    const fetchData = async () => {
        const res = await fetch(`http://localhost:8080/api/cards/`);
        const json = await res.json();
        setCard(json)
    };


    const setImageCards = () => {
        if (cards.length > 0) {
            const newArray = cards.map((c) => {
                let imageObject = Images.filter((i) => i.id === c.value)
                if (imageObject) {
                    return {
                        ...c, image: imageObject[0].imagePath
                    }
                }
            })
            setImages(newArray)
        }
    }

    console.log('imgCard', images)

  /*  const setCardsColor = () => {
        if (images.length > 0) {
            const newArray = images.map((c) => {
                let color = Images.filter((i) => i.id === c.value)
                if (color) {
                    return {
                        ...c, image: imageObject[0].imagePath
                    }
                }
            })
            setImages(newArray)
        }
    }*/


    const Card = ({value, color}) => {
        return (
            <div
                className={`card ${color}`}
                draggable={true}
                onDragStart={event => event.dataTransfer.setData("value", value)}
            >
                {value}
            </div>
        );
    };




    return (

        <div className="App-header">
            <img src={Title} className="title"/>
            <div>
                <button className="newgame-button">
                    <img src={NewGame} className="newgame-img" onClick={setImageCards}/>
                </button>

            </div>

            <Grid className="grid-container"/>
                   <div>
                {images.map((c) => (
                    <img key={c._id} src={c.image} className={`card${c.color}`}/>
                ))}
                   </div>

        </div>
    );
}

export default App;
