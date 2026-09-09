const {
    contextBridge,
    ipcRenderer
} = require("electron");

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
        }
    }
);