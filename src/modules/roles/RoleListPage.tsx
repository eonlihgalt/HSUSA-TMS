import { useEffect, useState } from "react";
import { RoleService } from "./RoleService";
import RoleDetailPage from "./RoleDetailPage";
import CreateRoleForm from "./CreateRoleForm";

const roleService = new RoleService();

export default function RoleListPage() {
    const [roles, setRoles] = useState<any[]>([]);
    const [selectedRole, setSelectedRole] = useState<string | null>(null);
    const [creating, setCreating] = useState(false);

    useEffect(() => {
        loadRoles();
    }, []);

    async function loadRoles() {
        const data = await roleService.getRoles();
        setRoles(data);
    }

    async function createRole(roleName: string, description: string) {
        const result = await roleService.createRole(roleName, description);
        console.log(result);
        setCreating(false);
        loadRoles();
    }

    // Early return for Creating view
    if (creating) {
        return (
            <CreateRoleForm
                onCreate={createRole}
                onCancel={() => setCreating(false)}
            />
        );
    }

    // Early return for Detail view
    if (selectedRole) {
        return <RoleDetailPage roleId={selectedRole} />;
    }

    return (
        <div style={{ padding: "40px" }}>
            <h1>Role List</h1>
            
            <button 
                onClick={() => setCreating(true)} 
                style={{ marginBottom: "20px" }}
            >
                + Create New Role
            </button>

            <table border={1} cellPadding={10} style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                    <tr>
                        <th>Role Name</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {roles?.map((role) => (
                        <tr key={role.id}>
                            <td>{role.roleName}</td>
                            <td>{role.description}</td>
                            <td>
                                <button onClick={() => setSelectedRole(role.id)}>
                                    View Details
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
