import { useState } from "react";
import LoginForm from "./LoginForm";
import MainMenu from "./MainMenu";

interface Props {
    onLoginSuccess: () => void;
}

export default function LoginPage(props: Props) {
    const [message, setMessage] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const [currentUserName, setCurrentUserName] = useState<string | null>(null);

    async function login(username: string, password: string) {
        const result = await window.hsusa.login(username, password);
        setMessage(result.message);

        if (result.success) {
            setCurrentUserName(result.user?.username ?? username);
            setLoggedIn(true);
            props.onLoginSuccess();
        }
    }

    function logout() {
        setLoggedIn(false);
        setCurrentUserName(null);
        setMessage("");
    }

    if (loggedIn) {
        return <MainMenu onLogout={logout} currentUserName={currentUserName} />;
    }

    return (
        <div style={{ padding: "40px" }}>
            <h1>HSUSA TMS</h1>
            <h2>Login</h2>
            <LoginForm onLogin={login} />
            {message && <div style={{ marginTop: 12 }}>{message}</div>}
        </div>
    );
}
