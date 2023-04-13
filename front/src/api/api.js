import axios from "axios";

export const api = {

    users: {
        post: (name, email, password) => axios.post('http://localhost:8080/api/users/', {name, email, password}),
        getByEmail: (user) => axios.post('http://localhost:8080/api/users/mail', {user}),
        get: (id) => axios.get(`http://localhost:8080/api/users/${id}`),
    },
    cards: {
        getAll: () => axios.get('http://localhost:8080/api/cards/')
    }
}