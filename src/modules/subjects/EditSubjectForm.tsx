import { useState }
from "react";

interface Props {
    subjectName: string;
    description: string;
    onUpdate: (subjectName: string, description: string) => void;
    onCancel: () => void;
}



export default function EditSubjectForm(
    props: Props
) {

    const [subjectName, setSubjectName] = useState(props.subjectName);
    const [description, setDescription] = useState(props.description);

    return (

        <div>

            <h2>
                Edit Subject
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
                onClick={() =>
                    props.onUpdate(
                        subjectName,
                        description
                    )
                }   
            >
                Update Subject
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