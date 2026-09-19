export {};

declare global {
    interface Window {
        hsusa: {
            applicationName: string;
            version: string;
            login: (username: string, password: string) => Promise<{ success: boolean; message: string; user?: { id: string; username: string } }>;
            logout: () => Promise<any>;
            getUserById: (userId: string) => Promise<any>;
            getUsers: () => Promise<any[]>;
            createUser: (user: any) => Promise<any>;
            updateUser: (user: any) => Promise<any>;
            deleteUser: (userId: string) => Promise<any>;
            changeUserPassword: (request: any) => Promise<any>;
            getRoles: () => Promise<any[]>;
            getRoleById: (roleId: string) => Promise<any>;
            createRole: (role: any) => Promise<any>;
            updateRole: (role: any) => Promise<any>;
            deleteRole: (roleId: string) => Promise<any>;
            getSubjects: () => Promise<any[]>;
            getSubjectById: (subjectId: string) => Promise<any>;
            createSubject: (subject: any) => Promise<any>;
            updateSubject: (subject: any) => Promise<any>;
            deleteSubject: (subjectId: string) => Promise<any>;
            getQuestions: () => Promise<any[]>;
            getQuestionById: (questionId: string) => Promise<any>;
            createQuestion: (question: any) => Promise<any>;
            updateQuestion: (question: any) => Promise<any>;
            deleteQuestion: (questionId: string) => Promise<any>;
            deleteQuestions: (questionIds: string[]) => Promise<any>;
            importQuestions: (questions: any[]) => Promise<any>;
            getQualifications: () => Promise<any[]>;
            getQualificationById: (id: string) => Promise<any>;
            createQualification: (qualification: any) => Promise<any>;
            updateQualification: (qualification: any) => Promise<any>;
            deleteQualification: (id: string) => Promise<any>;
        };
    }
}
