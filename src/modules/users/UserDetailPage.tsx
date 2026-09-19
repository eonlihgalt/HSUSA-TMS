import { useEffect, useState } from "react";
import { UserService } from "./UserService";
import ChangePasswordForm from "./ChangePasswordForm";

interface Props {
    userId: string;
    onBack: () => void;
}

const userService = new UserService();

export default function UserDetailPage(props: Props) {
    const [user, setUser] = useState<any>(null);
    const [changingPassword, setChangingPassword] = useState(false);

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
        window.alert("Password changed successfully.");
    }

    if (!user) return <div style={{ padding: "40px" }}>Loading...</div>;
    if (changingPassword) return <ChangePasswordForm onChange={changePassword} onCancel={() => setChangingPassword(false)} />;

    return (
        <div style={{ padding: "40px" }}>
            <h1>User Detail</h1>
            <button onClick={props.onBack}>Back To User List</button>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>First Name:</strong> {user.firstName}</p>
            <p><strong>Last Name:</strong> {user.lastName}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Status:</strong> {user.status}</p>
            <h2>Roles</h2>
            <ul>{user.userRoles?.map((role: any) => <li key={role.id}>{role.role.roleName}</li>)}</ul>
            <button onClick={() => setChangingPassword(true)}>Change Password</button>
            <button onClick={deleteUser} style={{ marginLeft: "10px" }}>Delete User</button>
        </div>
    );
}
