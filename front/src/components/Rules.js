import {Box, Fade, Modal} from "@mui/material";
import React, {useState} from "react";
import rules from "../assets/images/rules.png";
import { useNavigate } from 'react-router-dom';

export const Rules = () => {

    const [isOpen, setIsOpen] = useState(true);
    const history = useNavigate();

    const handleClose = () => {
        history('/');
        setIsOpen(false);
    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        overflow: 'auto',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        backgroundColor: '#282c34'

    };

    const imgStyle = {
        maxWidth: "100%",
        height: "auto",
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
                    <img src={rules} alt="Rules" style={imgStyle}/>
                </Box>
            </Fade>
        </Modal>
    )
}

export default Rules;