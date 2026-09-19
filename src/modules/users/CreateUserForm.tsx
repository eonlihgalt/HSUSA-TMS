import { useState } from "react";

interface Props {
    onCreate: (
        username: string,
        password: string,
        firstName: string,
        lastName: string,
        email: string,
        status: "ACTIVE" | "INACTIVE" | "LOCKED"
    ) => void;
    onCancel: () => void;
}

export default function CreateUserForm(props: Props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"ACTIVE" | "INACTIVE" | "LOCKED">("ACTIVE");

    return (
        <div style={{ padding: "40px" }}>
            <h2>Create User</h2>
            <label>Username<br /><input value={username} onChange={(e) => setUsername(e.target.value)} /></label><br /><br />
            <label>Temporary Password<br /><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></label><br /><br />
            <label>First Name<br /><input value={firstName} onChange={(e) => setFirstName(e.target.value)} /></label><br /><br />
            <label>Last Name<br /><input value={lastName} onChange={(e) => setLastName(e.target.value)} /></label><br /><br />
            <label>Email<br /><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></label><br /><br />
            <label>Status<br />
                <select value={status} onChange={(e) => setStatus(e.target.value as typeof status)}>
                    <option value="ACTIVE">Active</option>
                    <option value="INACTIVE">Inactive</option>
                    <option value="LOCKED">Locked</option>
                </select>
            </label><br /><br />
            <button onClick={() => props.onCreate(username, password, firstName, lastName, email, status)}>Create User</button>
            <button onClick={props.onCancel} style={{ marginLeft: "10px" }}>Cancel</button>
        </div>
    );
}
