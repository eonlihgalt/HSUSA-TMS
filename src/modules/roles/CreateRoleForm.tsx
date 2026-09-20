import { useState } from "react";

interface Props {
    onCreate: (roleName: string, description: string) => void;
    onCancel: () => void;
}

export default function CreateRoleForm(props: Props) {
    const [roleName, setRoleName] = useState("");
    const [description, setDescription] = useState("");

    function submit() {
        if (!roleName.trim()) return;
        props.onCreate(roleName.trim(), description.trim());
    }

    return (
        <div style={{ padding: "40px" }}>
            <h2>Create Role</h2>
            <label>
                Role Name<br />
                <input value={roleName} onChange={event => setRoleName(event.target.value)} autoFocus />
            </label>
            <br /><br />
            <label>
                Description<br />
                <textarea value={description} onChange={event => setDescription(event.target.value)} rows={4} />
            </label>
            <br /><br />
            <button onClick={submit} disabled={!roleName.trim()}>Save Role</button>
            <button onClick={props.onCancel} style={{ marginLeft: "10px" }}>Cancel</button>
        </div>
    );
}
