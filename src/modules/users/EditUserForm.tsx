import { useState } from "react";

interface Props {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    status: "ACTIVE" | "INACTIVE" | "LOCKED";
    onUpdate: (
        username: string,
        firstName: string,
        lastName: string,
        email: string,
        status: "ACTIVE" | "INACTIVE" | "LOCKED"
    ) => void;
    onCancel: () => void;
}

export default function EditUserForm(props: Props) {
    const [username, setUsername] = useState(props.username);
    const [firstName, setFirstName] = useState(props.firstName);
    const [lastName, setLastName] = useState(props.lastName);
    const [email, setEmail] = useState(props.email);
    const [status, setStatus] = useState<"ACTIVE" | "INACTIVE" | "LOCKED">(props.status);

    return (
        <div style={{ padding: "40px" }}>
            <h2>Edit User</h2>
            <label>Username<br /><input value={username} onChange={(e) => setUsername(e.target.value)} /></label><br /><br />
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
            <button onClick={() => props.onUpdate(username, firstName, lastName, email, status)}>Save User</button>
            <button onClick={props.onCancel} style={{ marginLeft: "10px" }}>Cancel</button>
        </div>
    );
}
