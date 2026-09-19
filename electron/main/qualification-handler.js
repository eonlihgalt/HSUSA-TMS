const { ipcMain } = require("electron");
const { PrismaClient } = require("@prisma/client");
const { getCurrentUserId } = require("./auth-context");

const prisma = new PrismaClient();

async function requireAdministrator() {
    const userId = getCurrentUserId();
    if (!userId) throw new Error("Authentication required");
    const role = await prisma.role.findUnique({ where: { roleName: "Administrator" } });
    if (!role) throw new Error("Administrator role is not configured");
    const assignment = await prisma.userRole.findFirst({ where: { userId, roleId: role.id } });
    if (!assignment) throw new Error("Administrator permission required");
}

function calculateStatus(expiresAt, status) {
    if (status === "SUSPENDED") return status;
    if (!expiresAt) return "CURRENT";
    const days = (new Date(expiresAt).getTime() - Date.now()) / 86400000;
    if (days < 0) return "EXPIRED";
    if (days <= 30) return "EXPIRING";
    return "CURRENT";
}

function serialize(qualification) {
    return { ...qualification, status: calculateStatus(qualification.expiresAt, qualification.status) };
}

async function audit(action) {
    await prisma.auditLog.create({ data: { entity: "Qualification", action } });
}

function dataFor(input) {
    return {
        name: input.name.trim(),
        description: input.description?.trim() || null,
        issuedAt: input.issuedAt ? new Date(input.issuedAt) : null,
        expiresAt: input.expiresAt ? new Date(input.expiresAt) : null,
        status: input.status || "CURRENT"
    };
}

function registerQualificationHandlers() {
    ipcMain.handle("qualifications-get-all", async () => {
        const records = await prisma.qualification.findMany({
            include: { assignments: { include: { user: true } } },
            orderBy: { name: "asc" }
        });
        return records.map(serialize);
    });

    ipcMain.handle("qualifications-get-by-id", async (event, id) => {
        const record = await prisma.qualification.findUnique({
            where: { id },
            include: { assignments: { include: { user: true } } }
        });
        return record ? serialize(record) : null;
    });

    ipcMain.handle("qualifications-create", async (event, input) => {
        await requireAdministrator();
        const created = await prisma.qualification.create({ data: dataFor(input), include: { assignments: { include: { user: true } } } });
        await audit("QUALIFICATION_CREATED");
        return { success: true, qualification: serialize(created) };
    });

    ipcMain.handle("qualifications-update", async (event, input) => {
        await requireAdministrator();
        const updated = await prisma.qualification.update({ where: { id: input.id }, data: dataFor(input), include: { assignments: { include: { user: true } } } });
        await audit("QUALIFICATION_UPDATED");
        return { success: true, qualification: serialize(updated) };
    });

    ipcMain.handle("qualifications-delete", async (event, id) => {
        await requireAdministrator();
        await prisma.qualification.delete({ where: { id } });
        await audit("QUALIFICATION_DELETED");
        return { success: true };
    });

    ipcMain.handle("qualifications-assign-user", async (event, input) => {
        await requireAdministrator();
        await prisma.userQualification.upsert({
            where: { userId_qualificationId: { userId: input.userId, qualificationId: input.qualificationId } },
            create: { userId: input.userId, qualificationId: input.qualificationId },
            update: {}
        });
        await audit("QUALIFICATION_ASSIGNED");
        return { success: true };
    });

    ipcMain.handle("qualifications-unassign-user", async (event, input) => {
        await requireAdministrator();
        await prisma.userQualification.delete({
            where: { userId_qualificationId: { userId: input.userId, qualificationId: input.qualificationId } }
        });
        await audit("QUALIFICATION_UNASSIGNED");
        return { success: true };
    });
}

module.exports = { registerQualificationHandlers };
