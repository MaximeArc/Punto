import React, {useEffect, useState} from 'react';
import {Box, Button, Modal, Tab, Tabs, TextField, Typography} from "@mui/material";
import {SignIn} from "./SignIn";
import {SignUp} from "./SignUp";

const Login = ({setUser}) => {

    const [value, setValue] = useState(0);
    const [isOpen, setIsOpen] = useState(true);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        backgroundColor:'#282c34',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        color:'white',


    };


    return (

        <Modal
            open={isOpen}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                        <Tabs value={value} onChange={handleChange} sx={{ justifyContent: 'space-evenly' }} >
                            <Tab label="Login" sx={{color:'white'}}/>
                            <Tab label="Signup" sx={{color:'white'}} />
                        </Tabs>
                <div>
                {value === 0 && <SignIn setIsOpen={setIsOpen} setUser={setUser}/>}
                {value === 1 && <SignUp setValue={setValue}/>}
                </div>
            </Box>
        </Modal>
    )
};

export default Login;