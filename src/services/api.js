import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:8080',
});

api.interceptors.request.use(
    (config) => {
        const token = JSON.parse(localStorage.getItem('user'));

        if (token) {
            config.headers['Authorization'] = `Bearer ${token.token}`;
        }

        return config;
    },

    function (error) {
        return Promise.reject(error);
    }
);

export default api; 