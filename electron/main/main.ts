import { app, BrowserWindow } from "electron";
import path from "path";

let mainWindow: BrowserWindow | null = null;

function createMainWindow(): void {
    mainWindow = new BrowserWindow({
        width: 1400,
        height: 900,
        title: "HSUSA Training Management System",
        webPreferences: {
            preload: path.join(__dirname, "../preload/preload.js"),
            contextIsolation: true,
            nodeIntegration: false
        }
    });

    mainWindow.loadURL("http://localhost:5174");

    mainWindow.on("closed", () => {
        mainWindow = null;
    });
}

app.whenReady().then(() => {
    createMainWindow();
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
