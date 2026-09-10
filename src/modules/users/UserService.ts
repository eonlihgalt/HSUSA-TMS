export class UserService {

    async getUsers() {

        return await window.hsusa.getUsers();
    }
    async getUserById(
        userId: string
    ) {

        return await window.hsusa.getUserById(
         userId
      );
    }
}