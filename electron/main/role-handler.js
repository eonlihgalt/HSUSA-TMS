const { ipcMain } = require("electron");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

function registerRoleHandlers() {

    ipcMain.handle(
        "roles-get-all",

        async () => {

            return await prisma.role.findMany({

                orderBy: {
                    roleName: "asc"
                }
            });
        }
    );

    ipcMain.handle(
        "roles-get-by-id",

        async (
            event,
            roleId
        ) => {

            return await prisma.role.findUnique({

                where: {
                    id: roleId
                },

                include: {
                    userRoles: true
                }
            });
        }
    );
}

module.exports = {
    registerRoleHandlers
};