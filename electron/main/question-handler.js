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

    ipcMain.handle(
        "questions-create",
        async (
            event,
            question
        ) => {
            const createdQuestion =
                await prisma.question.create({
                    data: {
                        questionText:
                            question.questionText,
                        category:
                            question.category || null,
                        difficulty:
                            question.difficulty || null,
                        answer:
                            question.answer || null
                    }
                });

            return {
                success: true,
                message: "Question created",
                question: createdQuestion
            };
        }
    );

    ipcMain.handle(
        "questions-update",
        async (
            event,
            question
        ) => {
            const updatedQuestion =
                await prisma.question.update({
                    where: {
                        id: question.id
                    },
                    data: {
                        questionText:
                            question.questionText,
                        category:
                            question.category || null,
                        difficulty:
                            question.difficulty || null,
                        answer:
                            question.answer || null
                    }
                });

            return {
                success: true,
                question: updatedQuestion
            };
        }
    );

    ipcMain.handle(
        "questions-delete",
        async (
            event,
            questionId
        ) => {
            await prisma.question.delete({
                where: {
                    id: questionId
                }
            });

            return {
                success: true
            };
        }
    );
}

module.exports = {
    registerQuestionHandlers
};
