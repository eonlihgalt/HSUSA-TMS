export class QuestionService {

    async getQuestions() {

        return await window.hsusa.getQuestions();
    }

}