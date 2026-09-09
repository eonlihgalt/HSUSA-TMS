export class UserService {

    async getUsers() {

        return await window.hsusa.getUsers();
    }
}