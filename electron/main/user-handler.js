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
}

module.exports = {
    registerUserHandlers
};