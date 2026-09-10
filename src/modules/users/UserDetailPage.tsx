import {
    useEffect,
    useState
}
from "react";

import { UserService }
from "./UserService";

interface Props {

    userId: string;
    onBack: () => void;
}

const userService =
    new UserService();

export default function UserDetailPage(
    props: Props
) {

    const [user, setUser] =
        useState<any>(null);

    useEffect(() => {

        loadUser();

    }, []);

    async function loadUser() {

        const result =
            await userService.getUserById(
                props.userId
            );

        setUser(result);
    }

    if (!user) {

        return (
            <div>
                Loading...
            </div>
        );
    }

    return (

        <div
            style={{
                padding: "40px"
            }}
        >

            <h1>
                User Detail
            </h1>

            <button
               onClick={() =>
                    props.onBack()
               }
            >
                Back To User List
            </button>

            <p>
                Username:
                {user.username}
            </p>

            <p>
                First Name:
                {user.firstName}
            </p>

            <p>
                Last Name:
                {user.lastName}
            </p>

            <p>
                Email:
                {user.email}
            </p>

            <p>
                Status:
                {user.status}
            </p>

            <h2>
                Roles
            </h2>

            <ul>

                {user.userRoles?.map(
                    (role: any) => (

                        <li
                            key={role.id}
                        >
                            {role.role.roleName}
                        </li>
                    )
                )}

            </ul>

        </div>
    );
}