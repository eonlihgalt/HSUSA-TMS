export {};

declare global {
    interface Window {
        hsusa: Window["hsusa"] & {
            getQualifications: () => Promise<any[]>;
            getQualificationById: (id: string) => Promise<any>;
            createQualification: (qualification: any) => Promise<any>;
            updateQualification: (qualification: any) => Promise<any>;
            deleteQualification: (id: string) => Promise<any>;
        };
    }
}
