import axios from "axios";

const api = axios.create({
    baseURL: 'https://api.dev.alugueaqui.xyz:8080',
    // baseURL: 'http://ec2-18-212-187-130.compute-1.amazonaws.com:8080',
    // baseURL: 'http://localhost:8080',
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
    },

    function (error) {
        return Promise.reject(error);
    }
);

export default api; 