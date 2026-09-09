import { contextBridge } from "electron";

contextBridge.exposeInMainWorld(
    "hsusa",
    {
        applicationName: "HSUSA TMS",
        version: "1.0.0",

        login: async (
            username: string,
            password: string
        ) => {

            console.log(
                "IPC Login Request",
                username
            );

            return {
                success: true,
                message:
                    "IPC Connected"
            };
        }
    }
);