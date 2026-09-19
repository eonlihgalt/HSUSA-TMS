import { useEffect, useState } from "react";
import { UserService } from "./UserService";
import ChangePasswordForm from "./ChangePasswordForm";
import EditUserForm from "./EditUserForm";
import { QualificationService, QualificationStatus } from "../qualifications/QualificationService";

interface Props {
    userId: string;
    onBack: () => void;
}

const userService = new UserService();
const qualificationService = new QualificationService();
type UserStatus = "ACTIVE" | "INACTIVE" | "LOCKED";
type Qualification = {
    id: string;
    name: string;
    description?: string | null;
    status: QualificationStatus;
    issuedAt?: string | null;
    expiresAt?: string | null;
};

type QualificationForm = {
    name: string;
    description: string;
    issuedAt: string;
    expiresAt: string;
    status: QualificationStatus;
};

const emptyQualification = (): QualificationForm => ({
    name: "",
    description: "",
    issuedAt: "",
    expiresAt: "",
    status: "CURRENT"
});

export default function UserDetailPage(props: Props) {
    const [user, setUser] = useState<any>(null);
    const [qualifications, setQualifications] = useState<Qualification[]>([]);
    const [changingPassword, setChangingPassword] = useState(false);
    const [editing, setEditing] = useState(false);
    const [addingQualification, setAddingQualification] = useState(false);
    const [qualificationForm, setQualificationForm] = useState<QualificationForm>(emptyQualification());
    const [message, setMessage] = useState("");

    useEffect(() => {
        loadUser();
        loadQualifications();
    }, [props.userId]);

    async function loadUser() {
        setUser(await userService.getUserById(props.userId));
    }

    async function loadQualifications() {
        const all = await qualificationService.getQualifications();
        setQualifications(all.filter((qualification: Qualification & { userId: string }) => qualification.userId === props.userId));
    }

    async function deleteUser() {
        if (!window.confirm("Delete this user?")) return;
        const result = await userService.deleteUser(props.userId);
        if (!result.success) {
            setMessage(result.message ?? "Unable to delete user.");
            return;
        }
        props.onBack();
    }

    async function changePassword(password: string) {
        const result = await userService.changePassword(props.userId, password);
        if (!result.success) {
            setMessage(result.message ?? "Unable to change password.");
            return;
        }
        setChangingPassword(false);
        setMessage("Password changed successfully.");
    }

    async function updateUser(username: string, firstName: string, lastName: string, email: string, status: UserStatus) {
        try {
            const result = await userService.updateUser({ id: props.userId, username, firstName, lastName, email, status });
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

    async function addQualification() {
        if (!qualificationForm.name.trim()) {
            setMessage("Qualification name is required.");
            return;
        }

        const result = await qualificationService.createQualification({
            ...qualificationForm,
            userId: props.userId
        });

        if (!result.success) {
            setMessage(result.message ?? "Unable to add qualification.");
            return;
        }

        setQualificationForm(emptyQualification());
        setAddingQualification(false);
        setMessage("Qualification added successfully.");
        await loadQualifications();
    }

    async function deleteQualification(id: string) {
        if (!window.confirm("Delete this qualification?")) return;
        const result = await qualificationService.deleteQualification(id);
        if (!result.success) {
            setMessage(result.message ?? "Unable to delete qualification.");
            return;
        }
        await loadQualifications();
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

            <h2>Qualifications</h2>
            <button onClick={() => { setQualificationForm(emptyQualification()); setAddingQualification(true); }}>
                + Add Qualification
            </button>

            {addingQualification && (
                <div style={{ border: "1px solid #ccc", padding: "16px", marginTop: "16px", maxWidth: "420px" }}>
                    <h3>New Qualification</h3>
                    <label>Name<br /><input value={qualificationForm.name} onChange={event => setQualificationForm({ ...qualificationForm, name: event.target.value })} /></label><br /><br />
                    <label>Description<br /><textarea value={qualificationForm.description} onChange={event => setQualificationForm({ ...qualificationForm, description: event.target.value })} /></label><br /><br />
                    <label>Issued Date<br /><input type="date" value={qualificationForm.issuedAt} onChange={event => setQualificationForm({ ...qualificationForm, issuedAt: event.target.value })} /></label><br /><br />
                    <label>Expiration Date<br /><input type="date" value={qualificationForm.expiresAt} onChange={event => setQualificationForm({ ...qualificationForm, expiresAt: event.target.value })} /></label><br /><br />
                    <label>Status<br /><select value={qualificationForm.status} onChange={event => setQualificationForm({ ...qualificationForm, status: event.target.value as QualificationStatus })}><option value="CURRENT">Current</option><option value="SUSPENDED">Suspended</option></select></label><br /><br />
                    <button onClick={addQualification}>Save Qualification</button>
                    <button onClick={() => setAddingQualification(false)} style={{ marginLeft: "10px" }}>Cancel</button>
                </div>
            )}

            <table border={1} cellPadding={10} style={{ marginTop: "16px" }}>
                <thead><tr><th>Name</th><th>Status</th><th>Expiration</th><th>Actions</th></tr></thead>
                <tbody>
                    {qualifications.map(qualification => (
                        <tr key={qualification.id}>
                            <td>{qualification.name}</td>
                            <td>{qualification.status}</td>
                            <td>{qualification.expiresAt ? new Date(qualification.expiresAt).toLocaleDateString() : "No expiration"}</td>
                            <td><button onClick={() => deleteQualification(qualification.id)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div style={{ marginTop: "20px" }}>
                <button onClick={() => setEditing(true)}>Edit User</button>
                <button onClick={() => setChangingPassword(true)} style={{ marginLeft: "10px" }}>Change Password</button>
                <button onClick={deleteUser} style={{ marginLeft: "10px" }}>Delete User</button>
            </div>
        </div>
    );
}
