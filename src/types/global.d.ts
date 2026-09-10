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
        };
    }
}