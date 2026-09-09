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

            getUsers: () => Promise<any[]>;
        };
    }
}