import {Box, Chip, Fade, FormControl, InputLabel, MenuItem, Modal, Select, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";

export const RoomsPanel = ({socket}) => {

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
        color: 'antiquewhite'
    };

    return (
        <Modal
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            closeAfterTransition
        >
            <Fade in={isOpen}>
                <Box sx={style}>
                    {rooms.length>0 && rooms.map((room) => (
                        <Typography
                            sx={{ display: 'flex', justifyContent: 'space-between' }}
                            variant="h5"
                            key={room.id}>
                            {`${room.name}  ${room.number} players `}
                            <FormControl fullWidth>
                            <InputLabel id="select-color">Color</InputLabel>
                            <Select
                                labelId="color"
                                id="color"
                                value={color}
                                label="Color"
                                onChange={handleChangeColor}
                            >
                                {room.remainingColors?.map((c,i) => {
                                 return (
                                            <MenuItem key={i} value={c}>{c}</MenuItem>
                                        )
                                 })}
                            </Select>
                            </FormControl>
                            {room.players?.length < room.number ?
                                <Chip
                                label={"Join"}
                                component={Link}
                                to={`/room/${room.id}`}
                                clickable
                                onClick={() => handleJoin(room)}
                                color={"success"}
                                />
                                :
                                <Chip
                                label={"Full"}
                                color={"error"}
                                />
                            }
                    </Typography>
                    ))}
                </Box>
            </Fade>
        </Modal>
    )

};

export default RoomsPanel;