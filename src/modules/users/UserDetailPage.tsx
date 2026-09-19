import { useEffect, useState } from "react";
import { UserService } from "./UserService";
import ChangePasswordForm from "./ChangePasswordForm";
import EditUserForm from "./EditUserForm";
import { QualificationService } from "../qualifications/QualificationService";
interface Props { userId: string; onBack: () => void; }
const userService = new UserService();
const qualificationService = new QualificationService();
type UserStatus = "ACTIVE" | "INACTIVE" | "LOCKED";
export default function UserDetailPage(props: Props) {
    const [user, setUser] = useState<any>(null); const [allQualifications, setAllQualifications] = useState<any[]>([]); const [changingPassword, setChangingPassword] = useState(false); const [editing, setEditing] = useState(false); const [message, setMessage] = useState("");
    async function load() { setUser(await userService.getUserById(props.userId)); setAllQualifications(await qualificationService.getQualifications()); }
    useEffect(() => { load(); }, [props.userId]);
    async function updateUser(username: string, firstName: string, lastName: string, email: string, status: UserStatus) { const result = await userService.updateUser({ id: props.userId, username, firstName, lastName, email, status }); if (!result.success) { setMessage(result.message); return; } setEditing(false); await load(); }
    async function setAssignment(qualificationId: string, assigned: boolean) { const result = assigned ? await qualificationService.assignUser(qualificationId, props.userId) : await qualificationService.unassignUser(qualificationId, props.userId); if (!result.success) setMessage(result.message ?? "Unable to update assignment."); else await load(); }
    if (!user) return <div style={{ padding: "40px" }}>Loading...</div>;
    const assignedIds = new Set(allQualifications.filter(q => q.assignments?.some((a: any) => a.user.id === props.userId)).map(q => q.id));
    if (changingPassword) return <ChangePasswordForm onChange={async password => { const r = await userService.changePassword(props.userId, password); if (!r.success) setMessage(r.message); else { setChangingPassword(false); setMessage("Password changed successfully."); } }} onCancel={() => setChangingPassword(false)} />;
    if (editing) return <EditUserForm username={user.username} firstName={user.firstName} lastName={user.lastName} email={user.email ?? ""} status={user.status} onUpdate={updateUser} onCancel={() => setEditing(false)} />;
    return <div style={{ padding: "40px" }}><h1>User Detail</h1><button onClick={props.onBack}>Back To User List</button>{message && <p>{message}</p>}<p><strong>Username:</strong> {user.username}</p><p><strong>First Name:</strong> {user.firstName}</p><p><strong>Last Name:</strong> {user.lastName}</p><p><strong>Email:</strong> {user.email}</p><p><strong>Status:</strong> {user.status}</p><h2>Roles</h2><ul>{user.userRoles?.map((role: any) => <li key={role.id}>{role.role.roleName}</li>)}</ul>
        <h2>Assigned Qualifications</h2><p>Select the qualifications assigned to this user.</p><div>{allQualifications.map(q => <label key={q.id} style={{ display: "block", marginBottom: "8px" }}><input type="checkbox" checked={assignedIds.has(q.id)} onChange={e => setAssignment(q.id, e.target.checked)} /> {q.name} ({q.status})</label>)}</div>
        <div style={{ marginTop: "20px" }}><button onClick={() => setEditing(true)}>Edit User</button><button onClick={() => setChangingPassword(true)} style={{ marginLeft: "10px" }}>Change Password</button></div></div>;
}
