const {
    contextBridge,
    ipcRenderer
} = require("electron");

contextBridge.exposeInMainWorld(
    "hsusa",
    {

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