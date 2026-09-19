import { useState } from "react";

interface Props {
    onChange: (password: string) => void;
    onCancel: () => void;
}

export default function ChangePasswordForm(props: Props) {
    const [password, setPassword] = useState("");
    const [confirmation, setConfirmation] = useState("");
    const [error, setError] = useState("");

    function submit() {
        if (!password) {
            setError("Password is required.");
            return;
        }
        if (password !== confirmation) {
            setError("Passwords do not match.");
            return;
        }
        props.onChange(password);
    }

    return (
        <div style={{ padding: "40px" }}>
            <h2>Change Password</h2>
            <label>New Password<br /><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></label><br /><br />
            <label>Confirm Password<br /><input type="password" value={confirmation} onChange={(e) => setConfirmation(e.target.value)} /></label><br /><br />
            {error && <p style={{ color: "darkred" }}>{error}</p>}
            <button onClick={submit}>Save Password</button>
            <button onClick={props.onCancel} style={{ marginLeft: "10px" }}>Cancel</button>
        </div>
    );
}
