const {
    contextBridge,
    ipcRenderer
} = require("electron");

console.log("PRELOAD LOADED");
console.log("HSUSA BRIDGE REGISTERING");

contextBridge.exposeInMainWorld("hsusa", {
    applicationName: "HSUSA TMS",
    version: "1.0.0",
    login: async (username, password) => ipcRenderer.invoke("auth-login", { username, password }),
    logout: async () => ipcRenderer.invoke("auth-logout"),
    getUserById: async (userId) => ipcRenderer.invoke("users-get-by-id", userId),
    getUsers: async () => ipcRenderer.invoke("users-get-all"),
    createUser: async (user) => ipcRenderer.invoke("users-create", user),
    updateUser: async (user) => ipcRenderer.invoke("users-update", user),
    deleteUser: async (userId) => ipcRenderer.invoke("users-delete", userId),
    changeUserPassword: async (request) => ipcRenderer.invoke("users-change-password", request),
    getRoles: async () => ipcRenderer.invoke("roles-get-all"),
    getRoleById: async (roleId) => ipcRenderer.invoke("roles-get-by-id", roleId),
    createRole: async (role) => ipcRenderer.invoke("roles-create", role),
    updateRole: async (role) => ipcRenderer.invoke("roles-update", role),
    deleteRole: async (roleId) => ipcRenderer.invoke("roles-delete", roleId),
    getSubjects: async () => ipcRenderer.invoke("subjects-get-all"),
    getSubjectById: async (subjectId) => ipcRenderer.invoke("subjects-get-by-id", subjectId),
    createSubject: async (subject) => ipcRenderer.invoke("subjects-create", subject),
    updateSubject: async (subject) => ipcRenderer.invoke("subjects-update", subject),
    deleteSubject: async (subjectId) => ipcRenderer.invoke("subjects-delete", subjectId),
    getQuestions: async () => ipcRenderer.invoke("questions-get-all"),
    getQuestionById: async (questionId) => ipcRenderer.invoke("questions-get-by-id", questionId),
    createQuestion: async (question) => ipcRenderer.invoke("questions-create", question),
    updateQuestion: async (question) => ipcRenderer.invoke("questions-update", question),
    deleteQuestion: async (questionId) => ipcRenderer.invoke("questions-delete", questionId),
    deleteQuestions: async (questionIds) => ipcRenderer.invoke("questions-delete-many", questionIds),
    importQuestions: async (questions) => ipcRenderer.invoke("questions-import", questions)
});
