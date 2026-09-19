import { useState } from "react";

interface Props {
    onLoginSuccess: () => void;
    onLogout: () => void;
    currentUserName?: string | null;
}

export default function MainMenu(props: Props) {
    const [selectedModule, setSelectedModule] = useState<string>("");

    if (selectedModule === "users") {
        return (
            <div style={{ padding: "40px" }}>
                <button onClick={() => setSelectedModule("")}>← Back</button>
                <h1>Users</h1>
                <p>Users module placeholder</p>
            </div>
        );
    }

    return (
        <div style={{ padding: "40px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h1>HSUSA TMS</h1>
                <div>
                    {props.currentUserName && <span style={{ marginRight: 12 }}>Logged in as: {props.currentUserName}</span>}
                    <button onClick={props.onLogout}>Switch User / Logout</button>
                </div>
            </div>

            <button onClick={() => setSelectedModule("users")}>Users</button>
        </div>
    );
}
