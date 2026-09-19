import { useEffect, useState } from "react";
import { QuestionService } from "./QuestionService";
import CreateQuestionForm from "./CreateQuestionForm";

interface Props {
    onBack: () => void;
}

const questionService = new QuestionService();

export default function QuestionListPage(
    props: Props
) {
    const [questions, setQuestions] =
        useState<any[]>([]);

    const [selectedQuestion, setSelectedQuestion] =
        useState<string | null>(null);

    const [creating, setCreating] =
        useState(false);

    useEffect(() => {
        loadQuestions();
    }, []);

    async function loadQuestions() {
        const data =
            await questionService.getQuestions();

        setQuestions(data);
    }

    async function createQuestion(
        questionText: string,
        category: string,
        difficulty: string,
        answer: string
    ) {
        await questionService.createQuestion(
            questionText,
            category,
            difficulty,
            answer
        );

        await loadQuestions();
        setCreating(false);
    }

    if (creating) {
        return (
            <CreateQuestionForm
                onCreate={createQuestion}
                onCancel={() =>
                    setCreating(false)
                }
            />
        );
    }

    if (selectedQuestion) {
        return (
            <QuestionDetailPage
                questionId={selectedQuestion}
                onBack={() => {
                    setSelectedQuestion(null);
                    loadQuestions();
                }}
            />
        );
    }

    return (
        <div style={{ padding: "40px" }}>
            <button
                onClick={props.onBack}
                style={{ marginBottom: "20px" }}
            >
                ← Back To Main Menu
            </button>

            <h1>Question Bank</h1>

            <button
                onClick={() =>
                    setCreating(true)
                }
                style={{ marginBottom: "20px" }}
            >
                + Create New Question
            </button>

            <table
                border={1}
                cellPadding={10}
                style={{
                    width: "100%",
                    borderCollapse: "collapse"
                }}
            >
                <thead>
                    <tr>
                        <th>Question</th>
                        <th>Category</th>
                        <th>Difficulty</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {questions?.map(
                        (question: any) => (
                            <tr key={question.id}>
                                <td>
                                    {question.questionText}
                                </td>

                                <td>
                                    {question.category}
                                </td>

                                <td>
                                    {question.difficulty}
                                </td>

                                <td>
                                    <button
                                        onClick={() =>
                                            setSelectedQuestion(
                                                question.id
                                            )
                                        }
                                    >
                                        View Details
                                    </button>
                                </td>
                            </tr>
                        )
                    )}
                </tbody>
            </table>
        </div>
    );
}
