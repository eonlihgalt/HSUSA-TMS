import { useState } from "react";

interface Props {
    roleName: string;
    description?: string | null;
    onUpdate: (roleName: string, description: string) => void;
    onCancel: () => void;
}

export default function EditRoleForm(props: Props) {
    const [roleName, setRoleName] = useState(props.roleName ?? "");
    const [description, setDescription] = useState(props.description ?? "");

    return (
        <div style={{ padding: "40px" }}>
            <h2>Edit Role</h2>
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
            <button disabled={!roleName.trim()} onClick={() => props.onUpdate(roleName.trim(), description.trim())}>Update Role</button>
            <button onClick={props.onCancel} style={{ marginLeft: "10px" }}>Cancel</button>
        </div>
    );
}
