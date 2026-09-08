import { contextBridge } from "electron";

contextBridge.exposeInMainWorld("hsusa", {
    applicationName: "HSUSA TMS",
    version: "1.0.0"
});