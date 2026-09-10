const {
    contextBridge,
    ipcRenderer
} = require("electron");

contextBridge.exposeInMainWorld(
    "hsusa",
    {

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
        }
    }
);