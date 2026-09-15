const { ipcMain } = require("electron");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

function registerQuestionHandlers() {

    ipcMain.handle(
        "questions-get-all",
        async () => {

            return await prisma.question.findMany({
                orderBy: {
                    questionText: "asc"
                }
            });
        }
    );

    ipcMain.handle(
        "questions-get-by-id",
        async (
            event,
            questionId
        ) => {

            return await prisma.question.findUnique({
                where: {
                    id: questionId
                }
            });
        }
    );



}

module.exports = {
    registerQuestionHandlers
};
