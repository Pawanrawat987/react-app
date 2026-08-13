import { useState } from "react";
import API from "../api";

export default function Login({ setToken }) {
    const [email, setEmail] = useState("");

    const handleLogin = async () => {
        try {
            const res = await API.post("/login", { email });
            localStorage.setItem("token", res.data.token);
            setToken(res.data.token);
        } catch (err) {
            alert("Login failed ❌" + err.response?.data?.message);
        }
    };

    return (
        <div className="card shadow-sm p-4 mt-5 mx-auto" style={{ maxWidth: 400 }}>
            <h3 className="mb-3 text-center">🔐 Login</h3>
            <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
            </div>
            <button className="btn btn-primary w-100" onClick={handleLogin}>
                Login
            </button>
        </div>
    );
}