import { useEffect, useState } from "react";
import { QuestionService } from "./QuestionService";

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

    if (!question) {

        return (
            <div style={{ padding: "40px" }}>
                Loading...
            </div>
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

            <h1>
                Question Detail
            </h1>

            <p>
                <strong>
                    Question:
                </strong>{" "}
                {question.questionText}
            </p>

            <p>
                <strong>
                    Category:
                </strong>{" "}
                {question.category}
            </p>

            <p>
                <strong>
                    Difficulty:
                </strong>{" "}
                {question.difficulty}
            </p>

            <p>
                <strong>
                    Answer:
                </strong>{" "}
                {question.answer}
            </p>

        </div>

    );
}
