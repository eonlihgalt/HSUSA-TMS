export type QualificationStatus = "CURRENT" | "EXPIRING" | "EXPIRED" | "SUSPENDED";

export class QualificationService {
    async getQualifications() { return await window.hsusa.getQualifications(); }
    async getQualificationById(id: string) { return await window.hsusa.getQualificationById(id); }
    async createQualification(qualification: { name: string; description: string; userId: string; expiresAt: string; status: QualificationStatus }) { return await window.hsusa.createQualification(qualification); }
    async updateQualification(qualification: { id: string; name: string; description: string; userId: string; expiresAt: string; status: QualificationStatus }) { return await window.hsusa.updateQualification(qualification); }
    async deleteQualification(id: string) { return await window.hsusa.deleteQualification(id); }
}
