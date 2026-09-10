import { useState } from "react";

import LoginForm from "./LoginForm";

interface Props {
    onLoginSuccess: () => void;
}

import { LoginService }
    from "./LoginService";


const loginService =
    new LoginService();

export default function LoginPage(
    props: Props
) {

    const [message, setMessage] =
        useState("");

    async function login(
        username: string,
        password: string
    ) {
        console.log("LOGIN CLICKED");
        console.log(
            "Attempting IPC Login"
        );
        const result =
            await loginService.login({

                username,

                password
            });

        setMessage(
            result.message
        );
        if (result.success) {

             props.onLoginSuccess();
        }
    }

    return (

        <div
            style={{
                padding: "40px"
            }}
        >

            <h1>
                HSUSA TMS
            </h1>

            <h2>
                Login
            </h2>

            <LoginForm
                onLogin={login}
            />

            <br />

            <div>
                {message}
            </div>

        </div>

    );
}