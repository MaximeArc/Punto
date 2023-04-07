import {
    Box, Chip, Fade,
    FormControl, FormControlLabel, InputLabel, MenuItem,
    Modal, Radio, RadioGroup, Select, TextField, Typography,
} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import rules from "../assets/images/rules.png";

export const LobbyCreation = ({socket}) => {

    const [colorPicker, setColorPicker] = useState(["Blue", "Red", "Green", "Yellow"]);
    const [isOpen, setIsOpen] = useState(true);
    const [number, setNumber] = useState('2');
    const [color, setColor] = useState("");
    const [roomName, setRoomName] = useState('');
    const [roomId, setRoomId] = useState('');

    const history = useNavigate();

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

    socket.once('roomId',  (roomId) => {
        console.log('roomId', roomId)
        const remainingColors = colorPicker.filter((c) => c !== color);
        if(color!==''){
            socket.emit('join', roomId, color, remainingColors);
            setRoomId(roomId);
        }

    })

    useEffect (() => {
        if(roomId!=='') {
            history(`/room/${roomId}`);
        }
    },[roomId])

    const handleCreate = (e) => {
        e.preventDefault();
        socket.emit('createRoom', roomName, Number(number));
    }


    const handleChange = (e) => {
        setNumber(e.target.value);
    };

    const handleNameChange = (e) => {
        setRoomName(e.target.value);
    }

    const handleClose = () => {
        history('/');
        setIsOpen(false);
    };

    const handleChangeColor = (e) => {
        setColor(e.target.value);
    }

    return (
        <Modal
            open={isOpen}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            onClose={handleClose}
            closeAfterTransition
        >

            <Fade in={isOpen}>
                <Box sx={style}>
                    <FormControl>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                            value={number}
                            onChange={handleChange}
                        >
                            <FormControlLabel value="2" control={<Radio />} label="2" />
                            <FormControlLabel value="3" control={<Radio />} label="3" />
                            <FormControlLabel value="4" control={<Radio />} label="4" />
                        </RadioGroup>
                        <Typography variant="h5"/>{"Room's name"}
                        <TextField id="standard-basic" variant="standard" onChange={handleNameChange} />
                        <FormControl fullWidth>
                        <InputLabel id="select-color">Color</InputLabel>
                        <Select
                            labelId="color"
                            id="color"
                            value={color}
                            label="Color"
                            onChange={handleChangeColor}
                        >
                            {colorPicker.length>0 &&
                                colorPicker.map((c,idx) => {
                                return (
                                    <MenuItem key={idx} value={c}>{c}</MenuItem>
                                )
                                })}
                        </Select>
                        </FormControl>
                        <Chip
                            label="Create"
                            component={Link}
                            clickable
                            onClick={handleCreate}
                            color="success"
                        />
                    </FormControl>
                </Box>
            </Fade>
        </Modal>
    )
}

export default LobbyCreation;