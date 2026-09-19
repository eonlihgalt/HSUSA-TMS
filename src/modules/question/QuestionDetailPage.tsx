import { useEffect, useState } from "react";
import { QuestionService } from "./QuestionService";
import EditQuestionForm from "./EditQuestionForm";

interface Props {
    questionId: string;
    onBack: () => void;
}

const questionService = new QuestionService();

export default function QuestionDetailPage(
    props: Props
) {
    const [question, setQuestion] =
        useState<any>(null);

    const [editing, setEditing] =
        useState(false);

    useEffect(() => {
        loadQuestion();
    }, [props.questionId]);

    async function loadQuestion() {
        const result =
            await questionService.getQuestionById(
                props.questionId
            );

        setQuestion(result);
    }

    async function updateQuestion(
        questionText: string,
        category: string,
        difficulty: string,
        answer: string
    ) {
        await questionService.updateQuestion(
            question.id,
            questionText,
            category,
            difficulty,
            answer
        );

        setEditing(false);
        await loadQuestion();
    }

    async function confirmDeleteQuestion() {
        if (
            window.confirm(
                "Delete this question?"
            )
        ) {
            await deleteQuestion();
        }
    }

    async function deleteQuestion() {
        try {
            const result =
                await questionService.deleteQuestion(
                    question.id
                );

            console.log(
                "Delete question result:",
                result
            );

            props.onBack();
        } catch (error) {
            console.error(
                "Delete question failed:",
                error
            );
        }
    }

    if (!question) {
        return (
            <div style={{ padding: "40px" }}>
                Loading...
            </div>
        );
    }

    if (editing) {
        return (
            <EditQuestionForm
                questionText={question.questionText}
                category={question.category ?? ""}
                difficulty={question.difficulty ?? ""}
                answer={question.answer ?? ""}
                onCancel={() =>
                    setEditing(false)
                }
                onUpdate={updateQuestion}
            />
        );
    }

    return (
        <div style={{ padding: "40px" }}>
            <button
                onClick={props.onBack}
                style={{ marginBottom: "20px" }}
            >
                ← Back To Question List
            </button>

            <h1>Question Detail</h1>

            <p>
                <strong>Question:</strong>{" "}
                {question.questionText}
            </p>

            <p>
                <strong>Category:</strong>{" "}
                {question.category}
            </p>

            <p>
                <strong>Difficulty:</strong>{" "}
                {question.difficulty}
            </p>

            <p>
                <strong>Answer:</strong>{" "}
                {question.answer}
            </p>

            <button
                onClick={() =>
                    setEditing(true)
                }
            >
                Edit Question
            </button>

            <button
                onClick={confirmDeleteQuestion}
                style={{ marginLeft: "10px" }}
            >
                Delete Question
            </button>
        </div>
    );
}
