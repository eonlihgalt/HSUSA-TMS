import { useEffect, useState } from "react";
import { SubjectService } from "./SubjectService";
import SubjectDetailPage from "./SubjectDetailPage";
import CreateSubjectForm from "./CreateSubjectForm";

interface Props {
    onBack: () => void;
}

const subjectService = new SubjectService();

export default function SubjectListPage(
    props: Props
) {

    const [subjects, setSubjects] =
        useState<any[]>([]);

    const [selectedSubject, setSelectedSubject] =
        useState<string | null>(null);

    const [creating, setCreating] =
        useState(false);

    useEffect(() => {
        loadSubjects();
    }, []);

    async function loadSubjects() {

        const data =
            await subjectService.getSubjects();

        console.log(
            "Subjects returned:",
            data
        );

        setSubjects(data);
    }

    async function createSubject(
        subjectName: string,
        description: string
    ) {

        console.log(
            "Creating subject:",
            subjectName,
            description
        );

        const result =
            await subjectService.createSubject(
                subjectName,
                description
            );

        console.log(
            "Create Subject Result:",
            result
        );

        await loadSubjects();

        console.log(
            "Subject list refreshed"
        );

        setCreating(false);
    }

    if (creating) {

        return (
            <CreateSubjectForm
                onCreate={createSubject}
                onCancel={() =>
                    setCreating(false)
                }
            />
        );
    }

    if (selectedSubject) {

        return (
            <SubjectDetailPage
                subjectId={selectedSubject}
                onBack={() => {
                    setSelectedSubject(null);
                    loadSubjects();
                }}
            />
        );
    }

    return (

        <div style={{ padding: "40px" }}>

            <button
                onClick={props.onBack}
                style={{ marginBottom: "20px" }}
            >
                ← Back To Main Menu
            </button>

            <h1>
                Subject List
            </h1>

            <button
                onClick={() =>
                    setCreating(true)
                }
                style={{
                    marginBottom: "20px"
                }}
            >
                + Create New Subject
            </button>

            <table
                border={1}
                cellPadding={10}
            >

                <thead>
                    <tr>
                        <th>Subject Name</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>

                    {subjects?.map(
                        (subject: any) => (

                            <tr key={subject.id}>

                                <td>
                                    {subject.subjectName}
                                </td>

                                <td>
                                    {subject.description}
                                </td>

                                <td>

                                    <button
                                        onClick={() =>
                                            setSelectedSubject(
                                                subject.id
                                            )
                                        }
                                    >
                                        View Details
                                    </button>

                                </td>

                            </tr>

                        )
                    )}

                </tbody>

            </table>

        </div>

    );
}