export class RoleService {

    async getRoles() {

        return await window.hsusa.getRoles();
    }

    async getRoleById(
        roleId: string
    ) {

        return await window.hsusa.getRoleById(
            roleId
        );
    }

    async createRole(
        roleName: string,
        description: string
    ) {

        return await window.hsusa.createRole({
            roleName,
            description
        });
    }

    async updateRole(
        id: string,
        roleName: string,
        description: string
    ) {

        return await window.hsusa.updateRole({
            id,
            roleName,
            description
        });
    }

    async deleteRole(
        roleId: string
    ) {

        return await window.hsusa.deleteRole(
            roleId
        );
    }

}