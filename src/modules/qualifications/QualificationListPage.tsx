import { useEffect, useState } from "react";
import { QualificationService, QualificationStatus } from "./QualificationService";

interface Props { onBack: () => void; }
type User = { id: string; username: string };
type Qualification = { id: string; name: string; description?: string | null; status: QualificationStatus; issuedAt?: string | null; expiresAt?: string | null; assignments?: Array<{ user: User }> };
type Form = { name: string; description: string; issuedAt: string; expiresAt: string; status: QualificationStatus };
const service = new QualificationService();
const emptyForm = (): Form => ({ name: "", description: "", issuedAt: "", expiresAt: "", status: "CURRENT" });

export default function QualificationListPage(props: Props) {
    const [items, setItems] = useState<Qualification[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [selected, setSelected] = useState<Qualification | null>(null);
    const [form, setForm] = useState<Form>(emptyForm());
    const [editing, setEditing] = useState(false);
    const [message, setMessage] = useState("");

    async function load() { setItems(await service.getQualifications()); setUsers(await window.hsusa.getUsers()); }
    useEffect(() => { load(); }, []);

    async function save() {
        if (!form.name.trim()) { setMessage("Qualification name is required."); return; }
        const result = editing && selected ? await service.updateQualification({ id: selected.id, ...form }) : await service.createQualification(form);
        if (!result.success) { setMessage(result.message ?? "Unable to save qualification."); return; }
        setEditing(false); setSelected(null); setForm(emptyForm()); await load();
    }

    async function assign(userId: string) { if (!selected) return; await service.assignUser(selected.id, userId); await load(); setSelected(await service.getQualificationById(selected.id)); }
    async function unassign(userId: string) { if (!selected) return; await service.unassignUser(selected.id, userId); await load(); setSelected(await service.getQualificationById(selected.id)); }
    const assignedIds = new Set((selected?.assignments ?? []).map(a => a.user.id));

    if (editing) return <div style={{ padding: "40px" }}><button onClick={() => setEditing(false)}>← Cancel</button><h1>{selected ? "Edit Qualification" : "New Qualification"}</h1>
        <label>Name<br /><input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></label><br /><br />
        <label>Description<br /><textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} /></label><br /><br />
        <label>Issued Date<br /><input type="date" value={form.issuedAt} onChange={e => setForm({ ...form, issuedAt: e.target.value })} /></label><br /><br />
        <label>Expiration Date<br /><input type="date" value={form.expiresAt} onChange={e => setForm({ ...form, expiresAt: e.target.value })} /></label><br /><br />
        <label>Status<br /><select value={form.status} onChange={e => setForm({ ...form, status: e.target.value as QualificationStatus })}><option value="CURRENT">Current</option><option value="SUSPENDED">Suspended</option></select></label><br /><br />
        <button onClick={save}>Save Qualification</button>
    </div>;

    if (selected) return <div style={{ padding: "40px" }}><button onClick={() => setSelected(null)}>← Back To Qualifications</button><h1>{selected.name}</h1><p>{selected.description}</p><p>Status: {selected.status}</p><p>Expires: {selected.expiresAt ? new Date(selected.expiresAt).toLocaleDateString() : "No expiration"}</p>
        <button onClick={() => { setForm({ name: selected.name, description: selected.description ?? "", issuedAt: selected.issuedAt?.slice(0, 10) ?? "", expiresAt: selected.expiresAt?.slice(0, 10) ?? "", status: selected.status }); setEditing(true); }}>Edit Qualification</button>
        <h2>Assigned Users</h2><select defaultValue="" onChange={e => { if (e.target.value) assign(e.target.value); }}><option value="">+ Assign user</option>{users.filter(u => !assignedIds.has(u.id)).map(u => <option key={u.id} value={u.id}>{u.username}</option>)}</select>
        <ul>{(selected.assignments ?? []).map(a => <li key={a.user.id}>{a.user.username} <button onClick={() => unassign(a.user.id)}>Remove</button></li>)}</ul>
    </div>;

    return <div style={{ padding: "40px" }}><button onClick={props.onBack}>← Back To Main Menu</button><h1>Qualifications</h1><button onClick={() => { setSelected(null); setForm(emptyForm()); setEditing(true); }}>+ Add Qualification</button>{message && <p>{message}</p>}
        <table border={1} cellPadding={10} style={{ marginTop: 20 }}><thead><tr><th>Name</th><th>Assigned Users</th><th>Status</th><th>Expiration</th><th>Actions</th></tr></thead><tbody>{items.map(item => <tr key={item.id}><td><button onClick={() => setSelected(item)}>{item.name}</button></td><td>{item.assignments?.length ?? 0}</td><td>{item.status}</td><td>{item.expiresAt ? new Date(item.expiresAt).toLocaleDateString() : "No expiration"}</td><td><button onClick={() => { setSelected(item); setForm({ name: item.name, description: item.description ?? "", issuedAt: item.issuedAt?.slice(0, 10) ?? "", expiresAt: item.expiresAt?.slice(0, 10) ?? "", status: item.status }); setEditing(true); }}>Edit</button> <button onClick={async () => { if (window.confirm("Delete this qualification?")) { await service.deleteQualification(item.id); await load(); } }}>Delete</button></td></tr>)}</tbody></table>
    </div>;
}
