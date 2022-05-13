import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3100",
})

api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['x-access-token'] = token.replace(/^"(.*)"$/, '$1');
    }
    return config;
});

export default api;