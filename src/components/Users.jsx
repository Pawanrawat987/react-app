import { useEffect } from "react";
import API from "../api";
import { useState} from "react";

export default function User(){
    const [users, setUsers] = useState([]);
    const [form, setForm] = useState({ name: "", email:"" });

    const fetchUsers = async () => {
        const res = await API.get("/users");
        setUsers(res.data);
    };

    const createUser = async () => {
        await API.post("/users", form);
        setForm({ name: "", email:"" });
        fetchUsers();
    };

    const updateUser = async (id) => {
        const newName = prompt("Enter new name:");
        if (newName) {
            await API.put(`/users/${id}`, {name: newName });
            fetchUsers();
        }
    };

    const deleteUser = async (id) => {
        await API.delete(`/users/${id}`);
        fetchUsers();
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className="p-4">
            <h2>Users</h2>

            <div>
                <input
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <input
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <button onClick={createUser}>Add User</button>
            </div>

            <ul>
                {users.map((u) => (
                    <li key={u._id}>
                        {u.name} ({u.email})
                        <button onClick={() => updateUser(u._id)}>Edit</button>
                        <button onClick={() => deleteUser(u._id)}>Delete</button>

                    </li>
                ))}
            </ul>
        </div>
    );
}