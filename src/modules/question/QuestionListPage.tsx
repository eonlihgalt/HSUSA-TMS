import { useEffect, useState } from "react";
import { QuestionService } from "./QuestionService";

interface Props {
    onBack: () => void;
}

const questionService = new QuestionService();

export default function QuestionListPage(
    props: Props
) {

    const [questions, setQuestions] =
        useState<any[]>([]);

    useEffect(() => {
        loadQuestions();
    }, []);

    async function loadQuestions() {

        const data =
            await questionService.getQuestions();

        setQuestions(data);
    }

    return (

        <div style={{ padding: "40px" }}>

            <button
                onClick={props.onBack}
                style={{ marginBottom: "20px" }}
            >
                ← Back To Main Menu
            </button>

            <h1>
                Question Bank
            </h1>

            <table
                border={1}
                cellPadding={10}
            >

                <thead>
                    <tr>
                        <th>Question</th>
                        <th>Category</th>
                        <th>Difficulty</th>
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

                            </tr>

                        )
                    )}

                </tbody>

            </table>

        </div>

    );
}