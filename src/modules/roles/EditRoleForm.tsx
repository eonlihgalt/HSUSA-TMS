import { useState }
from "react";

interface Props {
    roleName: string;
    description: string;
    onUpdate: (roleName: string, description: string) => void;
    onCancel: () => void;
}



export default function EditRoleForm(
    props: Props
) {

    const [roleName, setRoleName] = useState(props.roleName);
    const [description, setDescription] = useState(props.description);

    return (

        <div>

            <h2>
                Edit Role
            </h2>

            <div>

                <label>
                    Role Name
                </label>

                <input
                    value={roleName}
                    onChange={(e) =>
                        setRoleName(
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
                        roleName,
                        description
                    )
                }   
            >
                Update Role
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