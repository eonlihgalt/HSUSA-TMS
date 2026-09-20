import { useState } from "react";

interface Props {
    subjectName: string;
    description: string;
    onUpdate: (subjectName: string, description: string) => void;
    onCancel: () => void;
    saving?: boolean;
}

export default function EditSubjectForm(props: Props) {
    const [subjectName, setSubjectName] = useState(props.subjectName ?? "");
    const [description, setDescription] = useState(props.description ?? "");

    return (
        <div style={{ padding: "40px" }}>
            <h2>Edit Subject</h2>
            <label>
                Subject Name<br />
                <input value={subjectName} onChange={e => setSubjectName(e.target.value)} />
            </label>
            <br /><br />
            <label>
                Description<br />
                <textarea value={description} onChange={e => setDescription(e.target.value)} />
            </label>
            <br /><br />
            <button disabled={props.saving} onClick={() => props.onUpdate(subjectName, description)}>
                {props.saving ? "Saving..." : "Update Subject"}
            </button>
            <button disabled={props.saving} onClick={props.onCancel} style={{ marginLeft: "10px" }}>
                Cancel
            </button>
        </div>
    );
}
