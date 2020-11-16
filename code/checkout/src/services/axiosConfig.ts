import Axios from 'axios';

export const axios = Axios.create({
    timeout: 1000,
    headers: {
        "Content-Type" : "application/json"
    }
})