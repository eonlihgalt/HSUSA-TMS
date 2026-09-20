import { useEffect, useState } from "react";
import { QualificationService, QualificationStatus } from "./QualificationService";

interface Props { onBack: () => void; }
type User = { id: string; username: string };
type Assignment = { id: string; status: string; assignedAt: string; revokedAt?: string | null; completedAt?: string | null; endReason?: string | null; user: User };
type Qualification = { id: string; name: string; description?: string | null; status: QualificationStatus; issuedAt?: string | Date | null; expiresAt?: string | Date | null; assignments?: Assignment[] };
type Form = { name: string; description: string; issuedAt: string; expiresAt: string; status: QualificationStatus };

const service = new QualificationService();
const emptyForm = (): Form => ({ name: "", description: "", issuedAt: "", expiresAt: "", status: "CURRENT" });
const editableStatuses: QualificationStatus[] = ["CURRENT", "SUSPENDED"];

function dateInputValue(value?: string | Date | null): string {
    if (!value) return "";
    const date = value instanceof Date ? value : new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    return date.toISOString().slice(0, 10);
}

function toForm(item: Qualification): Form {
    return {
        name: item.name,
        description: item.description ?? "",
        issuedAt: dateInputValue(item.issuedAt),
        expiresAt: dateInputValue(item.expiresAt),
        status: editableStatuses.includes(item.status) ? item.status : "CURRENT"
    };
}

function errorMessage(error: unknown) {
    return error instanceof Error ? error.message : "Unable to save qualification.";
}

export default function QualificationListPage(props: Props) {
    const [items, setItems] = useState<Qualification[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [selected, setSelected] = useState<Qualification | null>(null);
    const [form, setForm] = useState<Form>(emptyForm());
    const [editing, setEditing] = useState(false);
    const [message, setMessage] = useState("");

    async function load() {
        try {
            setItems(await service.getQualifications());
            setUsers(await window.hsusa.getUsers());
        } catch (error) {
            setMessage(errorMessage(error));
        }
    }

    useEffect(() => { void load(); }, []);

    function startCreate() {
        setSelected(null);
        setForm(emptyForm());
        setMessage("");
        setEditing(true);
    }

    function startEdit(item: Qualification) {
        setSelected(item);
        setForm(toForm(item));
        setMessage("");
        setEditing(true);
    }

    function cancelEdit() {
        setEditing(false);
        setSelected(null);
        setForm(emptyForm());
    }

    async function save() {
        if (!form.name.trim()) {
            setMessage("Qualification name is required.");
            return;
        }

        try {
            const result = selected
                ? await service.updateQualification({ id: selected.id, ...form })
                : await service.createQualification(form);

            if (!result.success) {
                setMessage(result.message ?? "Unable to save qualification.");
                return;
            }

            cancelEdit();
            setMessage("Qualification saved successfully.");
            await load();
        } catch (error) {
            setMessage(errorMessage(error));
        }
    }

    async function openDetails(item: Qualification) {
        try {
            setSelected(await service.getQualificationById(item.id));
        } catch (error) {
            setMessage(errorMessage(error));
        }
    }

    async function assign(userId: string) {
        if (!selected) return;
        try {
            const result = await service.assignUser(selected.id, userId);
            if (!result.success) { setMessage(result.message ?? "Unable to assign user."); return; }
            await load();
            setSelected(await service.getQualificationById(selected.id));
        } catch (error) { setMessage(errorMessage(error)); }
    }

    async function unassign(userId: string) {
        if (!selected) return;
        try {
            const result = await service.unassignUser(selected.id, userId);
            if (!result.success) { setMessage(result.message ?? "Unable to remove user."); return; }
            await load();
            setSelected(await service.getQualificationById(selected.id));
        } catch (error) { setMessage(errorMessage(error)); }
    }

    async function remove(item: Qualification) {
        if (!window.confirm(`Delete qualification "${item.name}"?`)) return;
        try {
            const result = await service.deleteQualification(item.id);
            if (!result.success) { setMessage(result.message ?? "Unable to delete qualification."); return; }
            setSelected(null);
            await load();
        } catch (error) { setMessage(errorMessage(error)); }
    }

    if (editing) return (
        <div style={{ padding: "40px" }}>
            <button onClick={cancelEdit}>← Cancel</button>
            <h1>{selected ? "Edit Qualification" : "New Qualification"}</h1>
            {message && <p>{message}</p>}
            <label>Name<br /><input autoFocus value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></label><br /><br />
            <label>Description<br /><textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} /></label><br /><br />
            <label>Issued Date<br /><input type="date" value={form.issuedAt} onChange={e => setForm({ ...form, issuedAt: e.target.value })} /></label><br /><br />
            <label>Expiration Date<br /><input type="date" value={form.expiresAt} onChange={e => setForm({ ...form, expiresAt: e.target.value })} /></label><br /><br />
            <label>Status<br /><select value={form.status} onChange={e => setForm({ ...form, status: e.target.value as QualificationStatus })}><option value="CURRENT">Current</option><option value="SUSPENDED">Suspended</option></select></label><br /><br />
            <button onClick={() => void save()}>Save Qualification</button>
        </div>
    );

    if (selected) {
        const activeAssignments = (selected.assignments ?? []).filter(a => a.status === "ACTIVE");
        const assignedIds = new Set(activeAssignments.map(a => a.user.id));
        return (
            <div style={{ padding: "40px" }}>
                <button onClick={() => setSelected(null)}>← Back To Qualifications</button>
                <h1>{selected.name}</h1>
                {message && <p>{message}</p>}
                <p>{selected.description}</p>
                <p><strong>Status:</strong> {selected.status}</p>
                <p><strong>Expires:</strong> {selected.expiresAt ? new Date(selected.expiresAt).toLocaleDateString() : "No expiration"}</p>
                <button onClick={() => startEdit(selected)}>Edit Qualification</button>
                <h2>Assigned Users</h2>
                <select defaultValue="" onChange={e => { if (e.target.value) void assign(e.target.value); }}>
                    <option value="">+ Assign user</option>
                    {users.filter(user => !assignedIds.has(user.id)).map(user => <option key={user.id} value={user.id}>{user.username}</option>)}
                </select>
                <ul>{activeAssignments.map(assignment => <li key={assignment.id}>{assignment.user.username} <button onClick={() => void unassign(assignment.user.id)}>Remove</button></li>)}</ul>
                <h2>Assignment History</h2>
                <ul>{(selected.assignments ?? []).map(assignment => <li key={assignment.id}>{assignment.user.username} — {assignment.status} — {assignment.endReason ?? ""}</li>)}</ul>
            </div>
        );
    }

    return (
        <div style={{ padding: "40px" }}>
            <button onClick={props.onBack}>← Back To Main Menu</button>
            <h1>Qualifications</h1>
            <button onClick={startCreate}>+ Add Qualification</button>
            {message && <p>{message}</p>}
            <table border={1} cellPadding={10} style={{ marginTop: 20 }}>
                <thead><tr><th>Name</th><th>Assigned Users</th><th>Status</th><th>Expiration</th><th>Actions</th></tr></thead>
                <tbody>{items.map(item => <tr key={item.id}>
                    <td><button onClick={() => void openDetails(item)}>{item.name}</button></td>
                    <td>{item.assignments?.filter(a => a.status === "ACTIVE").length ?? 0}</td>
                    <td>{item.status}</td>
                    <td>{item.expiresAt ? new Date(item.expiresAt).toLocaleDateString() : "No expiration"}</td>
                    <td><button onClick={() => startEdit(item)}>Edit</button> <button onClick={() => void remove(item)}>Delete</button></td>
                </tr>)}</tbody>
            </table>
        </div>
    );
}
