import { useEffect, useState } from "react";
import { QualificationService, QualificationStatus } from "./QualificationService";

interface Props { onBack: () => void; }
const service = new QualificationService();

type User = { id: string; username: string };
type Qualification = {
    id: string;
    name: string;
    description?: string | null;
    status: QualificationStatus;
    issuedAt?: string | null;
    expiresAt?: string | null;
    userId: string;
    user?: User;
};

export default function QualificationListPage(props: Props) {
    const [items, setItems] = useState<Qualification[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [creating, setCreating] = useState(false);
    const [message, setMessage] = useState("");
    const [form, setForm] = useState({ name: "", description: "", userId: "", expiresAt: "", status: "CURRENT" as QualificationStatus });

    async function load() {
        setItems(await service.getQualifications());
        setUsers(await window.hsusa.getUsers());
    }

    useEffect(() => { load(); }, []);

    function resetForm() {
        setForm({ name: "", description: "", userId: users[0]?.id ?? "", expiresAt: "", status: "CURRENT" });
        setCreating(true);
    }

    async function save() {
        if (!form.name.trim() || !form.userId) {
            setMessage("Qualification name and assigned user are required.");
            return;
        }
        const result = await service.createQualification(form);
        if (!result.success) { setMessage(result.message ?? "Unable to create qualification."); return; }
        setCreating(false);
        setMessage("Qualification created.");
        await load();
    }

    async function remove(id: string) {
        if (!window.confirm("Delete this qualification?")) return;
        await service.deleteQualification(id);
        await load();
    }

    if (creating) return (
        <div style={{ padding: "40px" }}>
            <h1>New Qualification</h1>
            <label>Name<br /><input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></label><br /><br />
            <label>Description<br /><textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} /></label><br /><br />
            <label>Assigned User<br /><select value={form.userId} onChange={e => setForm({ ...form, userId: e.target.value })}>{users.map(user => <option key={user.id} value={user.id}>{user.username}</option>)}</select></label><br /><br />
            <label>Expiration Date<br /><input type="date" value={form.expiresAt} onChange={e => setForm({ ...form, expiresAt: e.target.value })} /></label><br /><br />
            <label>Status<br /><select value={form.status} onChange={e => setForm({ ...form, status: e.target.value as QualificationStatus })}><option value="CURRENT">Current</option><option value="SUSPENDED">Suspended</option></select></label><br /><br />
            <button onClick={save}>Save Qualification</button><button onClick={() => setCreating(false)} style={{ marginLeft: 10 }}>Cancel</button>
        </div>
    );

    return (
        <div style={{ padding: "40px" }}>
            <button onClick={props.onBack}>← Back To Main Menu</button>
            <h1>Qualifications</h1>
            <button onClick={resetForm}>+ Add Qualification</button>
            {message && <p>{message}</p>}
            <table border={1} cellPadding={10} style={{ marginTop: 20 }}><thead><tr><th>Qualification</th><th>User</th><th>Status</th><th>Expiration</th><th>Actions</th></tr></thead><tbody>
                {items.map(item => <tr key={item.id}><td>{item.name}</td><td>{item.user?.username ?? item.userId}</td><td>{item.status}</td><td>{item.expiresAt ? new Date(item.expiresAt).toLocaleDateString() : "No expiration"}</td><td><button onClick={() => remove(item.id)}>Delete</button></td></tr>)}
            </tbody></table>
        </div>
    );
}
