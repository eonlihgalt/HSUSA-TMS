import { useEffect, useState } from "react";
import { UserService } from "./UserService";
import UserDetailPage from "./UserDetailPage";
import CreateUserForm from "./CreateUserForm";

interface Props { onBack: () => void; }
const userService = new UserService();

export default function UserListPage(props: Props) {
    const [selectedUser, setSelectedUser] = useState<string | null>(null);
    const [users, setUsers] = useState<any[]>([]);
    const [creating, setCreating] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => { loadUsers(); }, []);

    async function loadUsers() {
        setUsers(await userService.getUsers());
    }

    async function createUser(username: string, password: string, firstName: string, lastName: string, email: string, status: "ACTIVE" | "INACTIVE" | "LOCKED") {
        try {
            const result = await userService.createUser({ username, password, firstName, lastName, email, status });
            if (!result.success) {
                setMessage(result.message);
                return;
            }
            setCreating(false);
            setMessage("User created successfully.");
            await loadUsers();
        } catch (error) {
            setMessage(error instanceof Error ? error.message : "Unable to create user.");
        }
    }

    if (creating) return <CreateUserForm onCreate={createUser} onCancel={() => setCreating(false)} />;
    if (selectedUser) return <UserDetailPage userId={selectedUser} onBack={() => { setSelectedUser(null); loadUsers(); }} />;

    return (
        <div style={{ padding: "40px" }}>
            <button onClick={props.onBack} style={{ marginBottom: "20px" }}>← Back To Main Menu</button>
            <h1>User List</h1>
            <button onClick={() => setCreating(true)}>+ Add User</button>
            {message && <p>{message}</p>}
            <table border={1} cellPadding={10} style={{ marginTop: "20px" }}>
                <thead><tr><th>Username</th><th>First Name</th><th>Last Name</th><th>Email</th><th>Status</th></tr></thead>
                <tbody>{users.map((user) => <tr key={user.id}>
                    <td><button onClick={() => setSelectedUser(user.id)}>{user.username}</button></td>
                    <td>{user.firstName}</td><td>{user.lastName}</td><td>{user.email}</td><td>{user.status}</td>
                </tr>)}</tbody>
            </table>
        </div>
    );
}
