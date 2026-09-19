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

            updateRole: (
                role: {
                    id: string;
                    roleName: string;
                    description: string;
                }
            ) => Promise<any>;

            deleteRole: (
                roleId: string
            ) => Promise<any>;

            getSubjects: () => Promise<any[]>;

            getSubjectById: (
                subjectId: string
            ) => Promise<any>;

            createSubject: (
                subject: {
                    subjectName: string;
                    description: string;
                }
            ) => Promise<any>;

            updateSubject: (
                subject: {
                    id: string;
                    subjectName: string;
                    description: string;
                }
            ) => Promise<any>;

            deleteSubject: (
                subjectId: string
            ) => Promise<any>;

            getQuestions: () => Promise<any[]>;

            getQuestionById: (
                questionId: string
            ) => Promise<any>;

            createQuestion: (
                question: {
                    questionText: string;
                    category?: string;
                    difficulty?: string;
                    answer?: string;
                }
            ) => Promise<any>;

            updateQuestion: (
                question: {
                    id: string;
                    questionText: string;
                    category?: string;
                    difficulty?: string;
                    answer?: string;
                }
            ) => Promise<any>;

            deleteQuestion: (
                questionId: string
            ) => Promise<any>;
        };
    }
}
