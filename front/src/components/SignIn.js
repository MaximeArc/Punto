import React, {useState} from "react";
import {api} from "../api/api";

export const SignIn = ({setIsOpen, setUser}) => {


    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault()
        let user = {email,password}
        const response = await api.users.getByEmail(user)
        try {
            const user = response.data;
            await setUser(user);
            setIsOpen(false);
        }
        catch (error) {
            console.log(error);
        }
    }

    return(
        <div className="form">
            <h2 className="form__title">Login</h2>
            <form>
                <input
                    className="form__input"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    className="form__input"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button
                    className="form__button"
                    onClick={handleLogin}>Login</button>
            </form>
        </div>
    )
}