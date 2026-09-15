export class QuestionService {

    async getQuestions() {

        return await window.hsusa.getQuestions();
    }

    async getQuestionById(
        questionId: string
    ) {

        return await window.hsusa.getQuestionById(
            questionId
        );
    }

}