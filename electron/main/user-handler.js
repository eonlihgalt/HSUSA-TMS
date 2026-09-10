const { ipcMain } = require("electron");
const { PrismaClient } = require("@prisma/client");

const prisma =
    new PrismaClient();

function registerUserHandlers() {

    ipcMain.handle(
        "users-get-all",

        async () => {

            return await prisma.user.findMany({

                orderBy: {
                    username: "asc"
                }
            });
        }
    );

    ipcMain.handle(
        "users-get-by-id",

        async (
            event,
            userId
        ) => {

            return await prisma.user.findUnique({

                where: {
                    id: userId
                },

                include: {
                    userRoles: {
                        include: {
                            role: true
                        }
                    }
                }
            });
        }
    );
}

module.exports = {
    registerUserHandlers
};