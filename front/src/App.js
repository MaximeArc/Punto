import Button from '@mui/material/Button';
import "./css/App.css";
import React, {useState, useEffect} from "react";
import {BrowserRouter as Router, Routes, Route, useLocation, Navigate} from 'react-router-dom';
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
import {api} from "./api/api";
import Turn from "./components/Turn";
import ScoreSheet from "./components/ScoreSheet";
import Message from "./components/Message";
import LoadPanel from "./components/LoadPanel";
import Message2 from "./components/Message2";

const socket = io("http://localhost:8080");


export const App = () => {


    const [cards, setCards] = useState([]);
    const [user, setUser] = useState(null);
    const [inGame, setInGame] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [gameLauched, setGameLaunched] = useState(false);
    const [gameWon, setGameWon] = useState('');
    const [roundWon, setRoundWon] = useState('');
    const [turn, setTurn] = useState('');
    const [score,setScore] = useState([]);

    socket.on('gameOver', () => {
        setCards([]);
        setRoundWon('');
        setTurn('');
        setScore([]);
        socket.off('gameOver')
        socket.emit('resetGame');
    })

    socket.on('gameWinner', async (data,score) => {
        console.log('game winner', data.name)
        await setGameWon(data.name);
        await setRoundWon(data.name);
        setScore(score);
        socket.off('gameWinner')
    })

    socket.on('refreshUsers', async () => {
        await api.users.get(user?.id).then((res) => {
            console.log('res', res.data)
            setUser(res.data);
        })
        socket.off('refreshUsers')
    })

    socket.on('roundWinner', async (data, score) => {
        await setTurn('')
        await setRoundWon(data.name);
        await setScore(score);
        setTimeout(() => {
            setRoundWon('');
        }, 3000)
    })

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setLoggedIn(true);
        }
    }, []);



    const fetchCards = async () => {
        const res = await api.cards.getAll();
        if (res.data.length > 0) {
            const newArray = res.data.map((c) => {
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
    const handleYourTurn = (data) => {
        if (data !== turn) {
            setTurn(data);
        }
    };

    return (
        <Router>

            {!loggedIn && <Navigate to="/login"/>}
            <Navbar/>
            <div style={{ flexGrow: 1 , textAlign:'center', backgroundColor: '#282c34',
                color: 'white' , marginBottom:'0px'}}>
            {turn !== '' &&
                    <Turn socket={socket} turn={turn}/>
            }
            {roundWon !== '' &&
                <Message roundWon={roundWon} gameWon={gameWon}/>
            }

            {score.length>0 && <ScoreSheet score={score}/>}
            </div>
            <div className="body" style={{display: 'flex'}}>
                <Hand className="hand" socket={socket} cards={cards} fetchCards={fetchCards} user={user} turn={turn}/>
                <Grid className="grid-container"
                      user={user}
                      socket={socket}
                      cards={cards}
                      setTurn={handleYourTurn}
                      style={{marginRight: '10px'}}/>
            </div>
            <Routes>
                <Route path="/rules" element={<Rules/>}/>
                <Route path="/profile" element={<Profile user={user}/>}/>
                <Route path="/lobby" element={<LobbyCreation socket={socket} user={user}/>}/>
                <Route path="/join" element={<RoomsPanel socket={socket} user={user}/>}/>
                <Route path="/login" element={<Login setUser={setUser}/>}/>
                <Route path="/load" element={<LoadPanel socket={socket} user={user}/>}/>

            </Routes>
        </Router>

    );
}
export default App;
