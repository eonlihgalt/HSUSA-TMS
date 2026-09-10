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

    ipcMain.handle(
        "roles-create",

        async (
           event,
           role
    ) => {

            const existing =
                await prisma.role.findFirst({

                    where: {
                        roleName:
                            role.roleName
                    }
                });

            if (existing) {

                return {
                    success: false,
                    message:
                        "Role already exists"
                };
            }

        const createdRole =
            await prisma.role.create({

                data: {
                    roleName:
                        role.roleName,

                    description:
                        role.description
                }
            });

        return {

            success: true,

            message:
                "Role created",

            role:
                createdRole
        };
    }
);




module.exports = {
    registerRoleHandlers
};