import React, {useEffect, useState} from 'react';
import {Box, Button, Modal, Tab, Tabs, TextField, Typography} from "@mui/material";
import {SignIn} from "./SignIn";
import {SignUp} from "./SignUp";

const Login = ({setUser}) => {

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    /*
        const handleLogin = async () => {
            try {
                const res = await fetch('http://localhost:8080/users/email', {username, password});
                const {success, message, user} = res.data;
                if (success) {
                    setMessage(message);
                    localStorage.setItem('user', JSON.stringify(user));
                } else {
                    setMessage(message);
                }
            } catch (error) {
                console.log(error);
                setMessage('An error occurred.');
            }
        };
    */


    const [tab, setTab] = useState('signIn');
    const [isOpen, setIsOpen] = useState(true);


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



    const handleSignup = () => {
        return null
    }



    return (

        <Modal
            open={isOpen}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                        <Tabs value={value} onChange={handleChange}>
                            <Tab label="Login" />
                            <Tab label="Signup" />
                        </Tabs>
                <div>
                {value === 0 && <SignIn setIsOpen={setIsOpen} setUser={setUser}/>}
                {value === 1 && <SignUp />}
                </div>
            </Box>
        </Modal>
    )
};

export default Login;