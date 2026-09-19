const { ipcMain } = require("electron");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

function calculateStatus(expiresAt, status) {
    if (status === "SUSPENDED") return status;
    if (!expiresAt) return "CURRENT";

    const expiration = new Date(expiresAt).getTime();
    const now = Date.now();
    const daysRemaining = (expiration - now) / (1000 * 60 * 60 * 24);

    if (daysRemaining < 0) return "EXPIRED";
    if (daysRemaining <= 30) return "EXPIRING";
    return "CURRENT";
}

function serializeQualification(qualification) {
    return {
        ...qualification,
        status: calculateStatus(qualification.expiresAt, qualification.status)
    };
}

function registerQualificationHandlers() {
    ipcMain.handle("qualifications-get-all", async () => {
        const qualifications = await prisma.qualification.findMany({
            include: { user: true },
            orderBy: [{ expiresAt: "asc" }, { name: "asc" }]
        });
        return qualifications.map(serializeQualification);
    });

    ipcMain.handle("qualifications-get-by-id", async (event, qualificationId) => {
        const qualification = await prisma.qualification.findUnique({
            where: { id: qualificationId },
            include: { user: true }
        });
        return qualification ? serializeQualification(qualification) : null;
    });

    ipcMain.handle("qualifications-create", async (event, qualification) => {
        const created = await prisma.qualification.create({
            data: {
                name: qualification.name,
                description: qualification.description || null,
                issuedAt: qualification.issuedAt ? new Date(qualification.issuedAt) : null,
                expiresAt: qualification.expiresAt ? new Date(qualification.expiresAt) : null,
                status: qualification.status || "CURRENT",
                userId: qualification.userId
            },
            include: { user: true }
        });
        return { success: true, qualification: serializeQualification(created) };
    });

    ipcMain.handle("qualifications-update", async (event, qualification) => {
        const updated = await prisma.qualification.update({
            where: { id: qualification.id },
            data: {
                name: qualification.name,
                description: qualification.description || null,
                issuedAt: qualification.issuedAt ? new Date(qualification.issuedAt) : null,
                expiresAt: qualification.expiresAt ? new Date(qualification.expiresAt) : null,
                status: qualification.status,
                userId: qualification.userId
            },
            include: { user: true }
        });
        return { success: true, qualification: serializeQualification(updated) };
    });

    ipcMain.handle("qualifications-delete", async (event, qualificationId) => {
        await prisma.qualification.delete({ where: { id: qualificationId } });
        return { success: true };
    });
}

module.exports = { registerQualificationHandlers };
