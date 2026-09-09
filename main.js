const { app, BrowserWindow } = require("electron");
const path = require("path");

let mainWindow = null;

function createMainWindow() {
    mainWindow = new BrowserWindow({
        width: 1400,
        height: 900,
        title: "HSUSA Training Management System",
        webPreferences: {
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
    app.quit();
});