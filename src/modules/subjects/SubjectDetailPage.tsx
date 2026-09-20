import { useEffect, useState } from "react";
import { SubjectService } from "./SubjectService";
import EditSubjectForm from "./EditSubjectForm";

interface Props {
    subjectId: string;
    onBack: () => void;
}

const subjectService = new SubjectService();

function messageFor(error: unknown, fallback: string): string {
    return error instanceof Error ? error.message : fallback;
}

export default function SubjectDetailPage(props: Props) {
    const [subject, setSubject] = useState<any>(null);
    const [editing, setEditing] = useState(false);
    const [message, setMessage] = useState("");
    const [saving, setSaving] = useState(false);

    async function loadSubject() {
        try {
            setSubject(await subjectService.getSubjectById(props.subjectId));
        } catch (error) {
            setMessage(messageFor(error, "Unable to load subject."));
        }
    }

    useEffect(() => { void loadSubject(); }, [props.subjectId]);

    async function updateSubject(subjectName: string, description: string) {
        if (!subjectName.trim()) {
            setMessage("Subject name is required.");
            return;
        }

        setSaving(true);
        setMessage("");
        try {
            const result = await subjectService.updateSubject(
                props.subjectId,
                subjectName.trim(),
                description.trim()
            );

            if (!result?.success) {
                setMessage(result?.message ?? "Unable to update subject.");
                return;
            }

            setEditing(false);
            setMessage("Subject updated successfully.");
            await loadSubject();
        } catch (error) {
            setMessage(messageFor(error, "Unable to update subject."));
        } finally {
            setSaving(false);
        }
    }

    async function deleteSubject() {
        try {
            const result = await subjectService.deleteSubject(props.subjectId);
            if (!result?.success) {
                setMessage(result?.message ?? "Unable to delete subject.");
                return;
            }
            props.onBack();
        } catch (error) {
            setMessage(messageFor(error, "Unable to delete subject."));
        }
    }

    if (!subject) {
        return <div style={{ padding: "40px" }}>{message || "Loading..."}</div>;
    }

    if (editing) {
        return (
            <EditSubjectForm
                subjectName={subject.subjectName ?? ""}
                description={subject.description ?? ""}
                onCancel={() => { setEditing(false); setMessage(""); }}
                onUpdate={updateSubject}
                saving={saving}
            />
        );
    }

    return (
        <div style={{ padding: "40px" }}>
            <button onClick={props.onBack} style={{ marginBottom: "20px" }}>
                ← Back To Subject List
            </button>
            <h1>Subject Detail</h1>
            {message && <p>{message}</p>}
            <p><strong>Subject Name:</strong> {subject.subjectName}</p>
            <p><strong>Description:</strong> {subject.description ?? ""}</p>
            <p><strong>Created:</strong> {String(subject.createdAt)}</p>
            <p><strong>Updated:</strong> {String(subject.updatedAt)}</p>
            <button onClick={() => { setMessage(""); setEditing(true); }}>Edit Subject</button>
            <button
                onClick={() => {
                    if (window.confirm("Delete this subject?")) void deleteSubject();
                }}
                style={{ marginLeft: "10px" }}
            >
                Delete Subject
            </button>
        </div>
    );
}
