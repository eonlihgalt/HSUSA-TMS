export {};

declare global {

    interface Window {

        hsusa: {

            getSubjects: () => Promise<any>;

            getSubjectById: (
                subjectId: string
            ) => Promise<any>;


            updateRole: (
              role: {
                 id: string;
                    roleName: string;
                    description: string;
              }
            ) => Promise<any>;


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

            deleteRole: (
                roleId: string
            ) => Promise<any>;

            getSubjectById: (
                subjectId: string
            ) => Promise<any>;

            createSubject: (
                subject: {
                    subjectName: string;
                    description: string;
                }
            ) => Promise<any>;

            deleteSubject: (
                subjectId: string
            ) => Promise<any>;

            updateSubject: (
                subject: {
                    id:string
                    subjectName: string;
                    description: string;
                }
            ) => Promise<any>;

            deleteSubject: (
                subjectId: string
            ) => Promise<any>;


        };
    }
}