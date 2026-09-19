const { ipcMain } = require("electron");
const { PrismaClient } = require("@prisma/client");
const { setCurrentUser, clearCurrentUser } = require("./auth-context");

const prisma = new PrismaClient();

function registerAuthenticationHandlers() {
    ipcMain.handle("auth-login", async (event, request) => {
        const user = await prisma.user.findUnique({
            where: { username: request.username }
        });

        if (!user) {
            return { success: false, message: "User not found" };
        }

        if (user.status !== "ACTIVE") {
            return { success: false, message: "User account is not active" };
        }

        if (user.passwordHash !== request.password) {
            return { success: false, message: "Invalid password" };
        }

        setCurrentUser(user.id);

        return {
            success: true,
            message: "Login successful",
            user: {
                id: user.id,
                username: user.username
            }
        };
    });

    ipcMain.handle("auth-logout", async () => {
        clearCurrentUser();
        return { success: true };
    });
}

module.exports = { registerAuthenticationHandlers };
