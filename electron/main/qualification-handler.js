const { ipcMain } = require("electron");
const { PrismaClient } = require("@prisma/client");
const { getCurrentUserId } = require("./auth-context");

const prisma = new PrismaClient();

async function requireAdministrator() {
    const userId = getCurrentUserId();
    if (!userId) throw new Error("Authentication required");

    const administratorRole = await prisma.role.findUnique({ where: { roleName: "Administrator" } });
    if (!administratorRole) throw new Error("Administrator role is not configured");

    const assignment = await prisma.userRole.findFirst({
        where: { userId, roleId: administratorRole.id }
    });
    if (!assignment) throw new Error("Administrator permission required");
}

function calculateStatus(expiresAt, status) {
    if (status === "SUSPENDED") return status;
    if (!expiresAt) return "CURRENT";

    const daysRemaining = (new Date(expiresAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24);
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

async function writeAudit(action) {
    await prisma.auditLog.create({ data: { entity: "Qualification", action } });
}

function qualificationData(qualification) {
    return {
        name: qualification.name.trim(),
        description: qualification.description?.trim() || null,
        issuedAt: qualification.issuedAt ? new Date(qualification.issuedAt) : null,
        expiresAt: qualification.expiresAt ? new Date(qualification.expiresAt) : null,
        status: qualification.status || "CURRENT",
        userId: qualification.userId
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
        await requireAdministrator();
        const created = await prisma.qualification.create({
            data: qualificationData(qualification),
            include: { user: true }
        });
        await writeAudit("QUALIFICATION_CREATED");
        return { success: true, qualification: serializeQualification(created) };
    });

    ipcMain.handle("qualifications-update", async (event, qualification) => {
        await requireAdministrator();
        const updated = await prisma.qualification.update({
            where: { id: qualification.id },
            data: qualificationData(qualification),
            include: { user: true }
        });
        await writeAudit("QUALIFICATION_UPDATED");
        return { success: true, qualification: serializeQualification(updated) };
    });

    ipcMain.handle("qualifications-delete", async (event, qualificationId) => {
        await requireAdministrator();
        await prisma.qualification.delete({ where: { id: qualificationId } });
        await writeAudit("QUALIFICATION_DELETED");
        return { success: true };
    });
}

module.exports = { registerQualificationHandlers };
