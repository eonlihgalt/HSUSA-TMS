import { useEffect, useState } from "react";
import { UserService } from "./UserService";
import ChangePasswordForm from "./ChangePasswordForm";
import EditUserForm from "./EditUserForm";

interface Props {
    userId: string;
    onBack: () => void;
}

const userService = new UserService();

type UserStatus = "ACTIVE" | "INACTIVE" | "LOCKED";

export default function UserDetailPage(props: Props) {
    const [user, setUser] = useState<any>(null);
    const [changingPassword, setChangingPassword] = useState(false);
    const [editing, setEditing] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        loadUser();
    }, [props.userId]);

    async function loadUser() {
        setUser(await userService.getUserById(props.userId));
    }

    async function deleteUser() {
        if (!window.confirm("Delete this user?")) return;
        await userService.deleteUser(props.userId);
        props.onBack();
    }

    async function changePassword(password: string) {
        await userService.changePassword(props.userId, password);
        setChangingPassword(false);
        setMessage("Password changed successfully.");
    }

    async function updateUser(
        username: string,
        firstName: string,
        lastName: string,
        email: string,
        status: UserStatus
    ) {
        try {
            const result = await userService.updateUser({
                id: props.userId,
                username,
                firstName,
                lastName,
                email,
                status
            });

            if (!result.success) {
                setMessage(result.message);
                return;
            }

            setEditing(false);
            setMessage("User updated successfully.");
            await loadUser();
        } catch (error) {
            setMessage(error instanceof Error ? error.message : "Unable to update user.");
        }
    }

    if (!user) return <div style={{ padding: "40px" }}>Loading...</div>;
    if (changingPassword) return <ChangePasswordForm onChange={changePassword} onCancel={() => setChangingPassword(false)} />;
    if (editing) {
        return (
            <EditUserForm
                username={user.username}
                firstName={user.firstName}
                lastName={user.lastName}
                email={user.email ?? ""}
                status={user.status}
                onUpdate={updateUser}
                onCancel={() => setEditing(false)}
            />
        );
    }

    return (
        <div style={{ padding: "40px" }}>
            <h1>User Detail</h1>
            <button onClick={props.onBack}>Back To User List</button>
            {message && <p>{message}</p>}
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>First Name:</strong> {user.firstName}</p>
            <p><strong>Last Name:</strong> {user.lastName}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Status:</strong> {user.status}</p>
            <h2>Roles</h2>
            <ul>{user.userRoles?.map((role: any) => <li key={role.id}>{role.role.roleName}</li>)}</ul>
            <button onClick={() => setEditing(true)}>Edit User</button>
            <button onClick={() => setChangingPassword(true)} style={{ marginLeft: "10px" }}>Change Password</button>
            <button onClick={deleteUser} style={{ marginLeft: "10px" }}>Delete User</button>
        </div>
    );
}
