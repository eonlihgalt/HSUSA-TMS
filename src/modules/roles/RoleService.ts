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
}