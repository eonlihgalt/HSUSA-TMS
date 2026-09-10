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