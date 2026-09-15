export class SubjectService {

    async getSubjects() {

        return await window.hsusa.getSubjects();
    }

    async getSubjectById(
        subjectId: string
    ) {

        return await window.hsusa.getSubjectById(
            subjectId
        );
    }

    async createSubject(
        subjectName: string,
        description: string
    ) {

        return await window.hsusa.createSubject({
            subjectName,
            description
        });
    }

    async updateSubject(
        id: string,
        subjectName: string,
        description: string
    ) {

        return await window.hsusa.updateSubject({
            id,
            subjectName,
            description
        });
    }

    async deleteSubject(
        subjectId: string
    ) {

        return await window.hsusa.deleteSubject(
            subjectId
        );
    }
    
}