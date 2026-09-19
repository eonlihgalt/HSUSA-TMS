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
type Form = { name: string; description: string; userId: string; issuedAt: string; expiresAt: string; status: QualificationStatus };

const emptyForm = (userId = ""): Form => ({ name: "", description: "", userId, issuedAt: "", expiresAt: "", status: "CURRENT" });

export default function QualificationListPage(props: Props) {
    const [items, setItems] = useState<Qualification[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [editing, setEditing] = useState<Qualification | null>(null);
    const [form, setForm] = useState<Form>(emptyForm());
    const [message, setMessage] = useState("");

    async function load() {
        setItems(await service.getQualifications());
        setUsers(await window.hsusa.getUsers());
    }

    useEffect(() => { load(); }, []);

    function beginCreate() {
        setEditing(null);
        setForm(emptyForm(users[0]?.id ?? ""));
    }

    function beginEdit(item: Qualification) {
        setEditing(item);
        setForm({
            name: item.name,
            description: item.description ?? "",
            userId: item.userId,
            issuedAt: item.issuedAt?.slice(0, 10) ?? "",
            expiresAt: item.expiresAt?.slice(0, 10) ?? "",
            status: item.status
        });
    }

    async function save() {
        if (!form.name.trim() || !form.userId) {
            setMessage("Qualification name and assigned user are required.");
            return;
        }

        const result = editing
            ? await service.updateQualification({ id: editing.id, ...form })
            : await service.createQualification(form);

        if (!result.success) {
            setMessage(result.message ?? "Unable to save qualification.");
            return;
        }

        setEditing(null);
        setMessage(editing ? "Qualification updated." : "Qualification created.");
        await load();
    }

    async function remove(id: string) {
        if (!window.confirm("Delete this qualification?")) return;
        const result = await service.deleteQualification(id);
        if (!result.success) setMessage(result.message ?? "Unable to delete qualification.");
        await load();
    }

    const update = (field: keyof Form, value: string) => setForm({ ...form, [field]: value });

    if (editing !== null || form.name !== "" || form.userId !== "") return (
        <div style={{ padding: "40px" }}>
            <button onClick={() => { setEditing(null); setForm(emptyForm()); }}>← Cancel</button>
            <h1>{editing ? "Edit Qualification" : "New Qualification"}</h1>
            <label>Name<br /><input value={form.name} onChange={e => update("name", e.target.value)} /></label><br /><br />
            <label>Description<br /><textarea value={form.description} onChange={e => update("description", e.target.value)} /></label><br /><br />
            <label>Assigned User<br /><select value={form.userId} onChange={e => update("userId", e.target.value)}>{users.map(user => <option key={user.id} value={user.id}>{user.username}</option>)}</select></label><br /><br />
            <label>Issued Date<br /><input type="date" value={form.issuedAt} onChange={e => update("issuedAt", e.target.value)} /></label><br /><br />
            <label>Expiration Date<br /><input type="date" value={form.expiresAt} onChange={e => update("expiresAt", e.target.value)} /></label><br /><br />
            <label>Status<br /><select value={form.status} onChange={e => update("status", e.target.value)}><option value="CURRENT">Current</option><option value="SUSPENDED">Suspended</option></select></label><br /><br />
            <button onClick={save}>Save Qualification</button>
        </div>
    );

    return (
        <div style={{ padding: "40px" }}>
            <button onClick={props.onBack}>← Back To Main Menu</button>
            <h1>Qualifications</h1>
            <button onClick={beginCreate}>+ Add Qualification</button>
            {message && <p>{message}</p>}
            <table border={1} cellPadding={10} style={{ marginTop: 20 }}>
                <thead><tr><th>Qualification</th><th>User</th><th>Status</th><th>Expiration</th><th>Actions</th></tr></thead>
                <tbody>{items.map(item => <tr key={item.id}>
                    <td>{item.name}</td><td>{item.user?.username ?? item.userId}</td><td>{item.status}</td>
                    <td>{item.expiresAt ? new Date(item.expiresAt).toLocaleDateString() : "No expiration"}</td>
                    <td><button onClick={() => beginEdit(item)}>Edit</button> <button onClick={() => remove(item.id)}>Delete</button></td>
                </tr>)}</tbody>
            </table>
        </div>
    );
}
