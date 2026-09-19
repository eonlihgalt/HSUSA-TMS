const { ipcMain } = require("electron");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

function registerUserHandlers() {
    ipcMain.handle("users-get-all", async () => prisma.user.findMany({ orderBy: { username: "asc" } }));

    ipcMain.handle("users-get-by-id", async (event, userId) => prisma.user.findUnique({
        where: { id: userId },
        include: { userRoles: { include: { role: true } } }
    }));

    ipcMain.handle("users-create", async (event, user) => {
        const existing = await prisma.user.findUnique({ where: { username: user.username } });
        if (existing) return { success: false, message: "Username already exists" };

        const createdUser = await prisma.user.create({
            data: {
                username: user.username,
                passwordHash: user.password,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email || null,
                status: user.status || "ACTIVE"
            }
        });

        return { success: true, user: createdUser };
    });

    ipcMain.handle("users-update", async (event, user) => {
        const existing = await prisma.user.findFirst({
            where: {
                username: user.username,
                NOT: { id: user.id }
            }
        });

        if (existing) return { success: false, message: "Username already exists" };

        const updatedUser = await prisma.user.update({
            where: { id: user.id },
            data: {
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email || null,
                status: user.status
            }
        });

        return { success: true, user: updatedUser };
    });

    ipcMain.handle("users-delete", async (event, userId) => {
        await prisma.userRole.deleteMany({ where: { userId } });
        await prisma.user.delete({ where: { id: userId } });
        return { success: true };
    });

    ipcMain.handle("users-change-password", async (event, request) => {
        await prisma.user.update({
            where: { id: request.userId },
            data: { passwordHash: request.password }
        });
        return { success: true };
    });
}

module.exports = { registerUserHandlers };
