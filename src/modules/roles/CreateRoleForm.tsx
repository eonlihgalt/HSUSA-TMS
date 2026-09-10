import { useState }
from "react";

interface Props {

    onCreate: (
        roleName: string,
        description: string
    ) => void;

    onCancel: () => void;
}

export default function CreateRoleForm(
    props: Props
) {

    const [roleName, setRoleName] =
        useState("");

    const [description, setDescription] =
        useState("");

    return (

        <div>

            <h2>
                Create Role
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
                    props.onCreate(
                        roleName,
                        description
                    )
                }   
            >
                Save Role
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