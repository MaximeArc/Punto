import {Box, Chip, Fade, FormControl, InputLabel, MenuItem, Modal, Select, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";

export const LoadPanel = ({socket}) => {

    const [isOpen, setIsOpen] = useState(true);
    const [rooms, setRooms] = useState([]);
    const [color, setColor] = useState('');


    const history = useNavigate();

    const handleClose = () => {
        history('/');
        setIsOpen(false);
    };

    const handleJoin = (room) => {
        const remainingColors = room.remainingColors.filter((c) => c !== color);
        socket.emit('join', room.id, color, remainingColors);
        localStorage.setItem("room", room.id)
        setIsOpen(false);
    };
    const handleChangeColor = (e) => {
        setColor(e.target.value);
    }


    useEffect(() => {
        socket.emit("getRooms");
        const handleRoomsList = (roomsList) => {
            setRooms([...roomsList]);
        };

        socket.on("roomsList", handleRoomsList);
        return () => {
            socket.off("roomsList", handleRoomsList);
        };
    }, []);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        backgroundColor: '#282c34',
        color: 'white'
    };

    return null
};

export default LoadPanel;