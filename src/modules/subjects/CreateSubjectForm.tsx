import { useState } from "react";

interface Props {

    onCreate: (
        subjectName: string,
        description: string
    ) => void;

    onCancel: () => void;
}

export default function CreateSubjectForm(
    props: Props
) {

    const [subjectName, setSubjectName] =
        useState("");

    const [description, setDescription] =
        useState("");

    return (

        <div>

            <h2>
                Create Subject
            </h2>

            <div>

                <label>
                    Subject Name
                </label>

                <input
                    value={subjectName}
                    onChange={(e) =>
                        setSubjectName(
                            e.target.value
                        )
                    }
                />

            </div>

            <br />

            <div>

                <label>
                    Description
                </label>

                <input
                    value={description}
                    onChange={(e) =>
                        setDescription(
                            e.target.value
                        )
                    }
                />

            </div>

            <br />

            <button
                onClick={() => {

                    console.log(
                        "SAVE SUBJECT CLICKED"
                    );

                    props.onCreate(
                        subjectName,
                        description
                    );
                }}
            >
                Save Subject
            </button>

            <button
                onClick={() =>
                    props.onCancel()
                }
            >
                Cancel
            </button>

        </div>

    );
}