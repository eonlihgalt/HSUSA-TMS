export type QualificationStatus = "CURRENT" | "EXPIRING" | "EXPIRED" | "SUSPENDED";
export type QualificationInput = { name: string; description: string; issuedAt: string; expiresAt: string; status: QualificationStatus };
export class QualificationService {
    async getQualifications() { return window.hsusa.getQualifications(); }
    async getQualificationById(id: string) { return window.hsusa.getQualificationById(id); }
    async createQualification(input: QualificationInput) { return window.hsusa.createQualification(input); }
    async updateQualification(input: QualificationInput & { id: string }) { return window.hsusa.updateQualification(input); }
    async deleteQualification(id: string) { return window.hsusa.deleteQualification(id); }
    async assignUser(qualificationId: string, userId: string) { return window.hsusa.assignQualificationUser({ qualificationId, userId }); }
    async unassignUser(qualificationId: string, userId: string) { return window.hsusa.unassignQualificationUser({ qualificationId, userId }); }
}
