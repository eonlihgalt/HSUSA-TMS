import { useEffect, useState } from "react";
import { RoleService } from "./RoleService";
import EditRoleForm from "./EditRoleForm";

interface Props {
    roleId: string;
    onBack: () => void; // Added to let the user return to the list
}

const roleService = new RoleService();

export default function RoleDetailPage(props: Props) {
    const [editing, setEditing] = useState(false);
    const [role, setRole] = useState<any>(null);

    useEffect(() => {
        loadRole();
    }, [props.roleId]); // Added dependency to re-run if ID changes

    async function loadRole() {
        const result = await roleService.getRoleById(props.roleId);
        setRole(result);
    }

    async function updateRole(
        roleName: string,
        description: string
    ) {

        await roleService.updateRole(
            role.id,
            roleName,
            description
        );

        setEditing(false);

        loadRole();
    }

    if (!role) {
        return (
            <div style={{ padding: "40px" }}>
                Loading...
            </div>
        );
    }
    if (editing) {

        return (
            <EditRoleForm
                roleName={role.roleName}
                description={role.description}
                onCancel={() => setEditing(false)}
                onUpdate={updateRole}
                
            />
        );
    }

    return (
        <div style={{ padding: "40px" }}>
            {/* Back button using the new prop */}
            <button onClick={props.onBack} style={{ marginBottom: "20px" }}>
                ← Back to List
            </button>

            <h1>Role Detail</h1>

            <p><strong>Role Name:</strong> {role.roleName}</p>
            <p><strong>Description:</strong> {role.description}</p>
            <p><strong>User Count:</strong> {role.userRoles?.length ?? 0}</p>

            {/* Edit button toggling local state */}
            <button onClick={() => setEditing(true)}>
                Edit Role
            </button>

            <h2>Assigned Users</h2>
            <ul>
                {role.userRoles?.map((userRole: any) => (
                    <li key={userRole.id}>
                        User ID: {userRole.userId}
                    </li>
                ))}
            </ul>
            
            {/* Visual indicator for edit state until you build the Edit form */}
            {editing && <p><em>Edit mode active (form coming soon...)</em></p>}
        </div>
    );
}
