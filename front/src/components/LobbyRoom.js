import {
    Box, Fade,
    FormControl, FormControlLabel,
    Modal, Radio, RadioGroup, TextField, Typography,
} from "@mui/material";
import {Link, useNavigate} from "react-router-dom";
import React, {useState} from "react";
import rules from "../assets/images/rules.png";

export const LobbyRoom = ({open}) => {

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
    };

    const [isOpen, setIsOpen] = useState(true);
    const [number, setNumber] = useState('2');
    const history = useNavigate();

    const handleChange = (e) => {
        setNumber(e.target.value);
    };

    const handleClose = () => {
        history('/');
        setIsOpen(false);
    };

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
                            onChange={handleChange}
                        >
                            <FormControlLabel value="2" control={<Radio />} label="2" />
                            <FormControlLabel value="3" control={<Radio />} label="3" />
                            <FormControlLabel value="4" control={<Radio />} label="4" />
                        </RadioGroup>
                        <Typography variant="h5"/>{"Room's name"}
                        <TextField id="standard-basic" variant="standard" />
                    </FormControl>
                </Box>
            </Fade>
        </Modal>
    )
}

export default LobbyRoom;