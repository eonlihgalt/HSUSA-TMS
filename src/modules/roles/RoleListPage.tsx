import {
    useEffect,
    useState
}
from "react";

import { RoleService }
from "./RoleService";

import RoleDetailPage
    from "./RoleDetailPage";


const roleService =
    new RoleService();

export default function RoleListPage() {

    const [roles, setRoles] =
        useState<any[]>([]);

    useEffect(() => {

        loadRoles();

    }, []);

    const [
        selectedRole,
       setSelectedRole
    ] = useState<string | null>(
       null
    );



    async function loadRoles() {

        const data =
            await roleService.getRoles();

        setRoles(data);
    }

    if (selectedRole) {

        return (
            <RoleDetailPage
               roleId={selectedRole}
         />
      );
    }



    return (

        <div
            style={{
                padding: "40px"
            }}
        >

            <h1>
                Role List
            </h1>

            <table
                border={1}
                cellPadding={10}
            >

                <thead>

                    <tr>
                        <th>Role Name</th>
                        <th>Description</th>
                    </tr>

                </thead>

                <tbody>

                    {roles.map(
                        (role: any) => (

                            <tr
                                key={role.id}
                            >

                                <td>
                                    <button
                                        onClick={() =>
                                            setSelectedRole(role.id)
                                        }
                                    >
                                        {role.roleName}
                                    </button>
                                </td>
                                <td>
                                    {role.roleName}
                                </td>

                                <td>
                                    {role.description}
                                </td>

                            </tr>
                        )
                    )}

                </tbody>

            </table>

        </div>
    );
}