import { useEffect, useState }
from "react";

import { UserService }
from "./UserService";

import UserDetailPage
from "./UserDetailPage";

interface Props {
    onBack: () => void;
}

const userService =
    new UserService();

export default function UserListPage(
    props: Props
) {

    const [
        selectedUser,
        setSelectedUser
    ] = useState<string | null>(
        null
    );

    const [users, setUsers] =
        useState<any[]>([]);

    useEffect(() => {

        loadUsers();

    }, []);

    async function loadUsers() {

        const data =
            await userService.getUsers();

        setUsers(data);
    }

    if (selectedUser) {

        return (
            <UserDetailPage
                userId={selectedUser}
                onBack={() =>
                    setSelectedUser(null)
                }
            />
        );
    }

    return (

        <div
            style={{
                padding: "40px"
            }}
        >

            <button
                onClick={props.onBack}
                style={{
                    marginBottom: "20px"
                }}
            >
                ← Back To Main Menu
            </button>

            <h1>
                User List
            </h1>

            <table
                border={1}
                cellPadding={10}
            >

                <thead>

                    <tr>
                        <th>Username</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Status</th>
                    </tr>

                </thead>

                <tbody>

                    {users.map(
                        (user) => (

                            <tr
                                key={user.id}
                            >

                                <td>

                                    <button
                                        onClick={() =>
                                            setSelectedUser(
                                                user.id
                                            )
                                        }
                                    >
                                        {user.username}
                                    </button>

                                </td>

                                <td>{user.firstName}</td>
                                <td>{user.lastName}</td>
                                <td>{user.email}</td>
                                <td>{user.status}</td>

                            </tr>

                        )
                    )}

                </tbody>

            </table>

        </div>

    );
}