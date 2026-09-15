const { ipcMain } = require("electron");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

function registerSubjectHandlers() {

    ipcMain.handle(
        "subjects-get-all",
        async () => {
            return await prisma.subject.findMany({
                orderBy: {
                    subjectName: "asc"
                }
            });
        }
    );

    ipcMain.handle(
        "subjects-get-by-id",
        async (
            event,
            subjectId
        ) => {
            return await prisma.subject.findUnique({
                where: {
                    id: subjectId
                }
            });
        }
    );

    ipcMain.handle(
        "subjects-create",
        async (
            event,
            subject
        ) => {

            console.log(
                "subjects-create called",
                subject
            );

            const existing =
                await prisma.subject.findFirst({
                    where: {
                        subjectName:
                            subject.subjectName
                    }
                });

            if (existing) {
                return {
                    success: false,
                    message:
                        "Subject already exists"
                };
            }

            const createdSubject =
                await prisma.subject.create({
                    data: {
                        subjectName:
                            subject.subjectName,

                        description:
                            subject.description
                    }
                });

            console.log(
                "Created subject:",
                createdSubject
            );

            return {
                success: true,
                message:
                    "Subject created",
                subject:
                    createdSubject
            };
        }
    );

    ipcMain.handle(
        "subjects-update",
        async (
            event,
            subject
        ) => {

            const updatedSubject =
                await prisma.subject.update({
                    where: {
                        id: subject.id
                    },

                    data: {
                        subjectName:
                            subject.subjectName,

                        description:
                            subject.description
                    }
                });

            return {
                success: true,
                subject: updatedSubject
            };
        }
    );

    ipcMain.handle(
        "subjects-delete",
        async (
            event,
            subjectId
        ) => {

            console.log(
                "Deleting subject:",
                subjectId
            );

            await prisma.subject.delete({
                where: {
                    id: subjectId
                }
            });

            console.log(
                "Deleted subject:",
                subjectId
            );

            return {
                success: true
            };
        }
    );
}

module.exports = {
    registerSubjectHandlers
};