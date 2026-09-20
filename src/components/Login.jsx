
import { useState } from "react";
import API from "../api";

export default function Login({ setToken }) {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [showCreate, setShowCreate] = useState(false);

    const handleLogin = async () => {
        try {
            const res = await API.post("/login", { email });

            localStorage.setItem("token", res.data.token);
            setToken(res.data.token);

        } catch (err) {
            if (err.response?.status === 404) {
                alert("User not found ❌ Please create a user first.");
                setShowCreate(true);
            } else {
                alert("Login failed ❌");
            }
        }
    };

    const handleCreateUser = async () => {
        try {
            await API.post("/users", {
                name,
                email
            });

            alert("User created successfully ✅ Now login.");

            setShowCreate(false);
            setName("");

        } catch (err) {
            alert(
                "User creation failed ❌ " +
                (err.response?.data?.message || "")
            );
        }
    };

    return (
        <div
            className="card shadow-sm p-4 mt-5 mx-auto"
            style={{ maxWidth: 400 }}
        >
            <h3 className="mb-3 text-center">🔐 Login</h3>

            {!showCreate ? (
                <>
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

                    <button
                        className="btn btn-primary w-100"
                        onClick={handleLogin}
                    >
                        Login
                    </button>

                    <button
                        className="btn btn-link w-100 mt-2"
                        onClick={() => setShowCreate(true)}
                    >
                        New user? Create User
                    </button>
                </>
            ) : (
                <>
                    <h4 className="mb-3">Create User</h4>

                    <div className="mb-3">
                        <label className="form-label">Name</label>

                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

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

                    <button
                        className="btn btn-success w-100"
                        onClick={handleCreateUser}
                    >
                        Create User
                    </button>

                    <button
                        className="btn btn-link w-100 mt-2"
                        onClick={() => setShowCreate(false)}
                    >
                        ← Back to Login
                    </button>
                </>
            )}
        </div>
    );
}
