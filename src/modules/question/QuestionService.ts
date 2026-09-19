export class QuestionService {
    async getQuestions() {
        return await window.hsusa.getQuestions();
    }

    async getQuestionById(questionId: string) {
        return await window.hsusa.getQuestionById(questionId);
    }

    async createQuestion(questionText: string, category: string, difficulty: string, answer: string) {
        return await window.hsusa.createQuestion({ questionText, category, difficulty, answer });
    }

    async updateQuestion(id: string, questionText: string, category: string, difficulty: string, answer: string) {
        return await window.hsusa.updateQuestion({ id, questionText, category, difficulty, answer });
    }

    async deleteQuestion(questionId: string) {
        return await window.hsusa.deleteQuestion(questionId);
    }

    async importQuestions(questions: Array<{
        questionText: string;
        category: string;
        difficulty: string;
        answer: string;
    }>) {
        return await window.hsusa.importQuestions(questions);
    }
}
