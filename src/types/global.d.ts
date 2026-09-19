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
            createUser: (user: { username: string; password: string; firstName: string; lastName: string; email: string; status: "ACTIVE" | "INACTIVE" | "LOCKED" }) => Promise<any>;
            updateUser: (user: { id: string; username: string; firstName: string; lastName: string; email: string; status: "ACTIVE" | "INACTIVE" | "LOCKED" }) => Promise<any>;
            deleteUser: (userId: string) => Promise<any>;
            changeUserPassword: (request: { userId: string; password: string }) => Promise<any>;
            getRoles: () => Promise<any[]>;
            getRoleById: (roleId: string) => Promise<any>;
            createRole: (role: { roleName: string; description: string }) => Promise<any>;
            updateRole: (role: { id: string; roleName: string; description: string }) => Promise<any>;
            deleteRole: (roleId: string) => Promise<any>;
            getSubjects: () => Promise<any[]>;
            getSubjectById: (subjectId: string) => Promise<any>;
            createSubject: (subject: { subjectName: string; description: string }) => Promise<any>;
            updateSubject: (subject: { id: string; subjectName: string; description: string }) => Promise<any>;
            deleteSubject: (subjectId: string) => Promise<any>;
            getQuestions: () => Promise<any[]>;
            getQuestionById: (questionId: string) => Promise<any>;
            createQuestion: (question: { questionText: string; category?: string; difficulty?: string; answer?: string }) => Promise<any>;
            updateQuestion: (question: { id: string; questionText: string; category?: string; difficulty?: string; answer?: string }) => Promise<any>;
            deleteQuestion: (questionId: string) => Promise<any>;
            deleteQuestions: (questionIds: string[]) => Promise<any>;
            importQuestions: (questions: Array<{ questionText: string; category: string; difficulty: string; answer: string }>) => Promise<any>;
        };
    }
}
