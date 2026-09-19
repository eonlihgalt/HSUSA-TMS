export type QualificationStatus = "CURRENT" | "EXPIRING" | "EXPIRED" | "SUSPENDED";

export type QualificationInput = {
    name: string;
    description: string;
    userId: string;
    issuedAt: string;
    expiresAt: string;
    status: QualificationStatus;
};

export class QualificationService {
    async getQualifications() { return await window.hsusa.getQualifications(); }
    async getQualificationById(id: string) { return await window.hsusa.getQualificationById(id); }
    async createQualification(qualification: QualificationInput) { return await window.hsusa.createQualification(qualification); }
    async updateQualification(qualification: QualificationInput & { id: string }) { return await window.hsusa.updateQualification(qualification); }
    async deleteQualification(id: string) { return await window.hsusa.deleteQualification(id); }
}
