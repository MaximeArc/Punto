import "./App.css";
import React, {useState, useEffect} from "react";
import Grid from "./Components/Grid";
import Title from "./Title.png";
import NewGame from "./NewGame.png";


export const App = () => {

    const [showInput, setShowInput] = useState(false);

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

    const CardList = ({color}) => {
        const values = [1, 2, 3, 4, 5, 6, 7, 8, 9];

        return (
            <div className="card-list">
                {values.map(value => (
                    <Card key={value} value={value} color={color}/>
                ))}
            </div>
        );
    };


    const onNewGameClick = () => {
        setShowInput(true)
    }

    return (

        <div className="App-header">
            <img src={Title} className="title"/>
            <div>
                <button className="newgame-button">
                    <img src={NewGame} className="newgame-img" onClick={onNewGameClick}/>
                </button>
                {showInput && (
                    <div style={{position: 'absolute', bottom: '40px', right: '40px'}}>
                        <input type="text" placeholder="Enter text here"/>
                    </div>)}
            </div>

            <Grid/>

            {/*         <div>
                <CardList color="red" />
                <CardList color="blue" />
            </div>*/}

        </div>
    );
}

export default App;
