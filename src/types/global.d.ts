export {};

declare global {

    interface Window {

        hsusa: {

            applicationName: string;

            version: string;

            login: (
                username: string,
                password: string
            ) => Promise<{

                success: boolean;

                message: string;
            }>;

            getUserById: (
                userId: string
            ) => Promise<any>;

            getUsers: () => Promise<any[]>;

            getRoles: () => Promise<any[]>;

            getRoleById: (
             roleId: string
            ) => Promise<any>;

            createRole: (
                role: {
                    roleName: string;
                    description: string;
                }
            ) => Promise<any>;



        };
    }
}