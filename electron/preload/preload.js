const {
    contextBridge,
    ipcRenderer
} = require("electron");

console.log("PRELOAD LOADED");
console.log("HSUSA BRIDGE REGISTERING");

contextBridge.exposeInMainWorld(
    "hsusa",
    {

        applicationName: "HSUSA TMS",

        version: "1.0.0",

        login: async (
            username,
            password
        ) => {

            return await ipcRenderer.invoke(
                "auth-login",
                {
                    username,
                    password
                }
            );
        },

        getUserById: async (
            userId
        ) => {

            return await ipcRenderer.invoke(
                "users-get-by-id",
                userId
            );
        },

        getUsers: async () => {

            return await ipcRenderer.invoke(
                "users-get-all"
            );
        },

        getRoles: async () => {

            return await ipcRenderer.invoke(
                "roles-get-all"
            );
        },

        getRoleById: async (
            roleId
        ) => {

            return await ipcRenderer.invoke(
                "roles-get-by-id",
                roleId
            );
        },

        createRole: async (
            role
        ) => {

            return await ipcRenderer.invoke(
                "roles-create",
                role
            );
        },

        updateRole: async (
            role
        ) => {

            return await ipcRenderer.invoke(
                "roles-update",
                role
            );
        },

        deleteRole: async (
            roleId
        ) => {

            return await ipcRenderer.invoke(
                "roles-delete",
                roleId
            );
        },

        getSubjects: async () => {

            return await ipcRenderer.invoke(
                "subjects-get-all"
            );
        },

        getSubjectById: async (
            subjectId
        ) => {

            return await ipcRenderer.invoke(
                "subjects-get-by-id",
                subjectId
            );
        },

        createSubject: async (
            subject
        ) => {

            return await ipcRenderer.invoke(
                "subjects-create",
                subject
            );
        },

        updateSubject: async (
            subject
        ) => {

            return await ipcRenderer.invoke(
                "subjects-update",
                subject
            );
        },

        deleteSubject: async (
            subjectId
        ) => {

            return await ipcRenderer.invoke(
                "subjects-delete",
                subjectId
            );
        },

        getQuestions: async () => {

            return await ipcRenderer.invoke(
                "questions-get-all"
            );
        }

    }
);