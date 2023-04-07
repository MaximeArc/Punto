import Button from '@mui/material/Button';
import "./css/App.css";
import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Grid from "./components/Grid";
import Hand from "./components/Hand";
import NewGame from "./assets/images/NewGame.png";
import Images from "./utils/images";
import io from "socket.io-client";
import {Navbar} from "./components/NavBar";
import Rules from "./components/Rules";
import LobbyCreation from "./components/LobbyCreation";
import Profile from "./components/Profile";
import Login from "./components/Login";
import {Paper} from "@mui/material";
import LobbyRoom from "./components/LobbyRoom";
import RoomsPanel from "./components/RoomsPanel";
const socket = io("http://localhost:8080");



export const App = () => {


    const [cards, setCards] = useState([]);
    const [user, setUser] = useState({});


    console.log('user',user)
    const fetchCards = async () => {
        const res = await fetch(`http://localhost:8080/api/cards/`);
        const json = await res.json();
        if (json.length > 0) {
            const newArray = json.map((c) => {
                let imageObject = Images.filter((i) => i.id === c.value)
                if (imageObject) {
                    return {
                        ...c, image: imageObject[0].imagePath
                    }
                }
            })
            setCards(newArray)
            return newArray;
        }
    };


    return (
        <Router>
                <Navbar />
                    <div className="body" style={{ display: 'flex' }}>
                        <Grid className="grid-container"  socket={socket} cards={cards} style={{ marginRight: '10px' }}/>
                        <Hand socket={socket} cards={cards} fetchCards={fetchCards}/>
                    </div>
                    <Routes>
                        <Route path="/rules" element={ <Rules  />} />
                        <Route path="/profile" element={<Profile user={user}/>}/>
                        <Route path="/lobby" element={<LobbyCreation socket={socket}/>} />
                        <Route path="/join" element={<RoomsPanel socket={socket}/>} />
                        <Route path="/login" element={<Login setUser={setUser} />} />
                    </Routes>
        </Router>

    );
}
export default App;
