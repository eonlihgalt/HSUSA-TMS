const { app, BrowserWindow } = require("electron");
const path = require("path");

const {
    registerAuthenticationHandlers
} = require(
    "./electron/main/auth-handler"
);

const {
    registerUserHandlers
} = require(
    "./electron/main/user-handler"
);

const {
    registerRoleHandlers
} = require(
    "./electron/main/role-handler"
);


let mainWindow = null;

function createMainWindow() {

    const preloadPath = path.join(
        __dirname,
        "electron",
        "preload",
        "preload.js"
    );

    console.log(
        "Using preload:",
        preloadPath
    );

    mainWindow = new BrowserWindow({
        width: 1400,
        height: 900,
        title: "HSUSA Training Management System",

        webPreferences: {
            preload: preloadPath,
            contextIsolation: true,
            nodeIntegration: false
        }
    });

    mainWindow.loadURL(
        "http://localhost:5173"
    );

    mainWindow.on(
        "closed",
        () => {
            mainWindow = null;
        }
    );
}

app.whenReady().then(() => {

    registerUserHandlers();

    registerAuthenticationHandlers();

    registerRoleHandlers();

    createMainWindow();
});

app.on("window-all-closed", () => {
    app.quit();
});