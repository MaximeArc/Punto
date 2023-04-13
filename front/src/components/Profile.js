
import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Box, Fade, Modal, Typography} from "@mui/material";
import rules from "../assets/images/rules.png";

export const Profile = ({user}) => {

    const [isOpen, setIsOpen] = useState(true);
    const history = useNavigate();

    const handleClose = () => {
        history('/');
        setIsOpen(false);
    };

    const style = {
        position: 'relative',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '25%',
        maxWidth: '100%',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        backgroundColor: '#282c34',
        color: 'white'
    };

    const victoryPercentage = (user?.victory / user?.played * 100 || 0).toFixed(1);
    const [integerPart, decimalPart] = victoryPercentage.split('.');

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
                    <Typography variant="h4" style={{marginBottom:'20px'}}>{user?.name}</Typography>
                    <Typography variant="h5">{`Games played : ${user?.played}`}</Typography>
                    <Typography variant="h5">{`Games won : ${user?.victory}`}</Typography>
                    <Typography variant="h5">{`Victory percentage : ${integerPart} %`}</Typography>
                </Box>
            </Fade>
        </Modal>
    )
}

export default Profile;