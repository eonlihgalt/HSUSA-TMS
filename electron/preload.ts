const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld(
    "hsusa",
    {
        applicationName: "HSUSA TMS",

        version: "1.0.0",

        login: async (
            username: string,
            password: string
        ) => {

            return await ipcRenderer.invoke(
                "auth-login",
                {
                    username,
                    password
                }
            );
        },

        getSubjects: async () => {

            return await ipcRenderer.invoke(
                "subjects-get-all"
            );
        },

        getSubjectById: async (
            subjectId: string
        ) => {

            return await ipcRenderer.invoke(
                "subjects-get-by-id",
                subjectId
            );
        },

        createSubject: async (
            subject: {
                subjectName: string;
                description: string;
            }
        ) => {

            return await ipcRenderer.invoke(
                "subjects-create",
                subject
            );
        }
    }
);

