import { useEffect, useState } from "react";
import { SubjectService } from "./SubjectService";
import EditSubjectForm from "./EditSubjectForm";

interface Props {
    subjectId: string;
    onBack: () => void;
}

const subjectService = new SubjectService();

export default function SubjectDetailPage(
    props: Props
) {

    const [subject, setSubject] =
        useState<any>(null);

    const [editing, setEditing] =
        useState(false);

    useEffect(() => {
        loadSubject();
    }, [props.subjectId]);

    async function loadSubject() {

        const result =
            await subjectService.getSubjectById(
                props.subjectId
            );

        setSubject(result);
    }

    async function updateSubject(
        subjectName: string,
        description: string
    ) {

        await subjectService.updateSubject(
            subject.id,
            subjectName,
            description
        );

        setEditing(false);

        await loadSubject();
    }

    async function confirmDeleteSubject() {

        if (
            window.confirm(
                "Delete this subject?"
            )
        ) {

            await deleteSubject();
        }
    }

    async function deleteSubject() {

        try {

            console.log(
                "Deleting Subject:",
                subject.id
            );

            const result =
                await subjectService.deleteSubject(
                    subject.id
                );

            console.log(
                "Delete result:",
                result
            );

            props.onBack();

        } catch (error) {

            console.error(
                "Delete failed:",
                error
            );
        }
    }

    if (!subject) {

        return (
            <div style={{ padding: "40px" }}>
                Loading...
            </div>
        );
    }

    if (editing) {

        return (
            <EditSubjectForm
                subjectName={subject.subjectName}
                description={subject.description}
                onCancel={() =>
                    setEditing(false)
                }
                onUpdate={updateSubject}
            />
        );
    }

    return (

        <div style={{ padding: "40px" }}>

            <button
                onClick={props.onBack}
                style={{ marginBottom: "20px" }}
            >
                ← Back To Subject List
            </button>

            <h1>
                Subject Detail
            </h1>

            <p>
                <strong>
                    Subject Name:
                </strong>{" "}
                {subject.subjectName}
            </p>

            <p>
                <strong>
                    Description:
                </strong>{" "}
                {subject.description}
            </p>

            <p>
                <strong>
                    Created:
                </strong>{" "}
                {String(subject.createdAt)}
            </p>

            <p>
                <strong>
                    Updated:
                </strong>{" "}
                {String(subject.updatedAt)}
            </p>

            <button
                onClick={() =>
                    setEditing(true)
                }
            >
                Edit Subject
            </button>

            <button
                onClick={confirmDeleteSubject}
                style={{ marginLeft: "10px" }}
            >
                Delete Subject
            </button>

        </div>

    );
}