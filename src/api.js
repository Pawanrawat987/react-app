import axios from "axios";

const API = axios.create({
    baseURL: "https://express-app-to5j.onrender.com", // Express backend
});

// Attach token automatically if available
API.interceptors.request.use((req) => {
    const token = local = localStorage.getItem("token");
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export default API;