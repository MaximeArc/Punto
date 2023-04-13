import {
    Box, Chip, Fade,
    FormControl, FormControlLabel, InputLabel, MenuItem,
    Modal, Radio, RadioGroup, Select, TextField, Typography,
} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import rules from "../assets/images/rules.png";

export const LobbyCreation = ({socket, user}) => {

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
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        color: 'white'
    };

    socket.once('roomId',  (roomId) => {
        const remainingColors = colorPicker.filter((c) => c !== color);
        if(color!==''){
            socket.emit('join', roomId, color, remainingColors, user);
            setRoomId(roomId);
        }

    })

   /* useEffect (() => {
        if(roomId!=='') {
            history(`/room/${roomId}`);
        }
    },[roomId])*/

    const handleCreate = async (e) => {
        e.preventDefault();
        await socket.emit('createRoom', roomName, Number(number));
        setIsOpen(false);
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
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexDirection:'inherit' }}>
                                <Typography variant="h6" sx={{ marginRight: '1rem' }}>Number of Players</Typography>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                    value={number}
                                    onChange={handleChange}
                                >
                                    <FormControlLabel value="2" control={<Radio sx={{ color: 'white' }} />} label="2" />
                                    <FormControlLabel value="3" control={<Radio sx={{ color: 'white' }} />} label="3" />
                                    <FormControlLabel value="4" control={<Radio sx={{ color: 'white' }} />} label="4" />
                                </RadioGroup>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' , flexDirection:'inherit'}}>
                                <Typography variant="h6" sx={{ marginRight: '1rem' }}>Room's Name</Typography>
                                <TextField  variant="standard" onChange={handleNameChange} inputProps={{ style: { color: 'white' } }}/>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', width:'100%' }}>
                                <FormControl fullWidth sx={{backgroundColor: '#282c34'  }}>
                                    <InputLabel id="select-color" sx={{ color: 'white' }}>Color</InputLabel>
                                    <Select
                                        labelId="color"
                                        id="color"
                                        value={color}
                                        label="Color"
                                        onChange={handleChangeColor}
                                        sx={{ color: 'white', backgroundColor: '#282c34' }}
                                    >
                                        {colorPicker.length > 0 &&
                                            colorPicker.map((c,idx) => {
                                                return (
                                                    <MenuItem key={idx} value={c}>{c}</MenuItem>
                                                )
                                            })
                                        }
                                    </Select>
                                </FormControl>
                            </div>
                            <Chip
                                label="Create"
                                component={Link}
                                clickable
                                onClick={handleCreate}
                                color="success"
                                sx={{ marginTop: '1rem', width: '100%'}}
                            />
                        </div>
                    </FormControl>
                </Box>
            </Fade>
        </Modal>
    )
}

export default LobbyCreation;