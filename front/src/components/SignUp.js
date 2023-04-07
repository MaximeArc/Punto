import React, {useState} from "react";
import axios from "axios";
import {api} from "../api/api";

export const SignUp = () => {

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');


    const handleRegister = async (e) => {
        e.preventDefault()
        try {
            await api.users.post(name, email, password);
        } catch (error) {
            console.log(error);
        }
    }


   /* const handleRegister = async () => {
        console.log({username, email, password})
        try {
            await fetch('http://localhost:8080/api/users/',{
                method : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify({username, email, password})
                });
        } catch (error) {
            console.log(error);
        }
    }*/
    const handleUsername = (value) => {
        setName(value);
    }

    const handlePassword = (value) => {
        setPassword(value);
    }

    const handleEmail = (value) => {
        setEmail(value);
    }


    return (
        <div className="form">
            <h2 className="form__title">Register</h2>
            <form onSubmit={(e) => handleRegister(e)}>
                <input
                    className="form__input"
                    type="text"
                    placeholder="Username"
                    value={name}
                    onChange={(e) => handleUsername(e.target.value)}
                    required
                />
                <input
                    className="form__input"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => handleEmail(e.target.value)}
                    required
                />
                <input
                    className="form__input"
                    type="password"
                    placeholder="Password"
                    //value={registerPassword}
                    onChange={(e) =>
                        handlePassword(e.target.value)}
                    required
                />
                <button className="form__button" type="submit">Register</button>
            </form>
        </div>
    )
}