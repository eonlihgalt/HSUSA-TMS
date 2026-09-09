const { ipcMain } = require("electron");

const {
    PrismaClient
} = require("@prisma/client");

const prisma =
    new PrismaClient();

function registerAuthenticationHandlers() {

    ipcMain.handle(
        "auth-login",

        async (
            event,
            request
        ) => {

            const user =
                await prisma.user.findUnique({

                    where: {
                        username:
                            request.username
                    }
                });

            if (!user) {

                return {
                    success: false,
                    message:
                        "User not found"
                };
            }

            if (
                user.status !==
                "ACTIVE"
            ) {

                return {
                    success: false,

                    message:
                        "User account is not active"
                };
            }

            if (
                user.passwordHash !==
                request.password
            ) {

                return {
                    success: false,

                    message:
                        "Invalid password"
                };
            }

            return {

                success: true,

                message:
                    "Login successful",

                user: {
                    id: user.id,
                    username:
                        user.username
                }
            };
        }
    );
}

module.exports = {
    registerAuthenticationHandlers
};