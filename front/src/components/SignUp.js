import React, {useState} from "react";
import axios from "axios";
import {api} from "../api/api";

export const SignUp = ({setValue}) => {

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');


    const handleRegister = async (e) => {
        e.preventDefault()
        try {
            await api.users.post(name, email, password);
            setValue(0)
        } catch (error) {
            console.log(error);
        }
    }

    const style = {
        backgroundColor:'#282c34',
        color:'white',
    };

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
        <div className="form" style={style}>
            <h2 className="form__title">Register</h2>
            <form onSubmit={(e) => handleRegister(e)}>
                <input
                    className="form__input"
                    type="text"
                    placeholder="Username"
                    value={name}
                    onChange={(e) => handleUsername(e.target.value)}
                    required
                    style={{color:'white', backgroundColor:'#282c34'}}
                />
                <input
                    className="form__input"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => handleEmail(e.target.value)}
                    required
                    style={{color:'white', backgroundColor:'#282c34'}}
                />
                <input
                    className="form__input"
                    type="password"
                    placeholder="Password"
                    //value={registerPassword}
                    onChange={(e) =>
                        handlePassword(e.target.value)}
                    required
                    style={{color:'white', backgroundColor:'#282c34'}}
                />
                <div style={{textAlign: "center"}}>
                <button className="form__button" type="submit">Register</button>
                </div>
            </form>
        </div>
    )
}