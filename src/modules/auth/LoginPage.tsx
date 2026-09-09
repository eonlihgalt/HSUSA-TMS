import { useState } from "react";

import LoginForm from "./LoginForm";

import { LoginService }
    from "./LoginService";

const loginService =
    new LoginService();

export default function LoginPage() {

    const [message, setMessage] =
        useState("");

    async function login(
        username: string,
        password: string
    ) {
        console.log("LOGIN CLICKED");
        const result =
            await loginService.login({

                username,

                password
            });

        setMessage(
            result.message
        );
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