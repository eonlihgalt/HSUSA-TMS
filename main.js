const { app, BrowserWindow } = require("electron");
const path = require("path");
const { registerAuthenticationHandlers } = require("./electron/main/auth-handler");
const { registerUserHandlers } = require("./electron/main/user-handler");
const { registerRoleHandlers } = require("./electron/main/role-handler");
const { registerSubjectHandlers } = require("./electron/main/subject-handler");
const { registerQuestionHandlers } = require("./electron/main/question-handler");
const { registerQualificationHandlers } = require("./electron/main/qualification-handler");

let mainWindow = null;

function createMainWindow() {
    const preloadPath = path.join(__dirname, "electron", "preload", "preload.js");
    mainWindow = new BrowserWindow({
        width: 1400,
        height: 900,
        title: "HSUSA Training Management System",
        webPreferences: { preload: preloadPath, contextIsolation: true, nodeIntegration: false }
    });
    mainWindow.loadURL("http://localhost:5173");
    mainWindow.on("closed", () => { mainWindow = null; });
}

app.whenReady().then(() => {
    registerUserHandlers();
    registerSubjectHandlers();
    registerQuestionHandlers();
    registerAuthenticationHandlers();
    registerRoleHandlers();
    registerQualificationHandlers();
    createMainWindow();
});

app.on("window-all-closed", () => app.quit());
