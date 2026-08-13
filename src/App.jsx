import { useState } from "react";
import Login from "./components/Login";
import Users from "./components/Users";

function App() {
    const [token, setToken] = useState(localStorage.getItem("token"));

    return (
        <div className="App">
            <h1>React + Express + MongoDB + JWT</h1>
            {!token ? <Login setToken={setToken} /> : <Users />}

        </div>
    );
}

export default App;