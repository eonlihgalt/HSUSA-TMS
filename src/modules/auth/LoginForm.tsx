import { useState } from "react";

interface Props {

    onLogin: (
        username: string,
        password: string
    ) => void;
}

export default function LoginForm(
    props: Props
) {

    const [username, setUsername] =
        useState("");

    const [password, setPassword] =
        useState("");

    return (

        <div>

            <div>

                <label>
                    Username
                </label>

                <input
                    value={username}
                    onChange={(e) =>
                        setUsername(
                            e.target.value
                        )
                    }
                />

            </div>

            <br />

            <div>

                <label>
                    Password
                </label>

                <input
                    type="password"
                    value={password}
                    onChange={(e) =>
                        setPassword(
                            e.target.value
                        )
                    }
                />

            </div>

            <br />

            <button
                onClick={() =>
                    props.onLogin(
                        username,
                        password
                    )
                }
            >
                Login
            </button>

        </div>

    );
}