import { useState } from "react";

interface Props {
    onLogin: (username: string, password: string) => void;
}

export default function LoginForm(props: Props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div style={{ maxWidth: 320 }}>
            <label style={{ display: "block", marginBottom: 12 }}>
                Username
                <input
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    style={{ width: "100%", marginTop: 4 }}
                />
            </label>

            <label style={{ display: "block", marginBottom: 12 }}>
                Password
                <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    style={{ width: "100%", marginTop: 4 }}
                />
            </label>

            <button onClick={() => props.onLogin(username, password)} style={{ width: "100%" }}>
                Login
            </button>
        </div>
    );
}
