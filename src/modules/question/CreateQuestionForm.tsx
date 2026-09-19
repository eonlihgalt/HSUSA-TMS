import { useState } from "react";

interface Props {
    onCreate: (
        questionText: string,
        category: string,
        difficulty: string,
        answer: string
    ) => void;

    onCancel: () => void;
}

export default function CreateQuestionForm(
    props: Props
) {
    const [questionText, setQuestionText] =
        useState("");

    const [category, setCategory] =
        useState("");

    const [difficulty, setDifficulty] =
        useState("");

    const [answer, setAnswer] =
        useState("");

    return (
        <div style={{ padding: "40px" }}>
            <h2>Create Question</h2>

            <div>
                <label>Question Text</label>
                <br />
                <textarea
                    value={questionText}
                    onChange={(e) =>
                        setQuestionText(
                            e.target.value
                        )
                    }
                    rows={4}
                    style={{ width: "100%" }}
                />
            </div>

            <br />

            <div>
                <label>Category</label>
                <br />
                <input
                    value={category}
                    onChange={(e) =>
                        setCategory(
                            e.target.value
                        )
                    }
                    style={{ width: "100%" }}
                />
            </div>

            <br />

            <div>
                <label>Difficulty</label>
                <br />
                <input
                    value={difficulty}
                    onChange={(e) =>
                        setDifficulty(
                            e.target.value
                        )
                    }
                    style={{ width: "100%" }}
                />
            </div>

            <br />

            <div>
                <label>Answer</label>
                <br />
                <input
                    value={answer}
                    onChange={(e) =>
                        setAnswer(
                            e.target.value
                        )
                    }
                    style={{ width: "100%" }}
                />
            </div>

            <br />

            <button
                onClick={() => {
                    props.onCreate(
                        questionText,
                        category,
                        difficulty,
                        answer
                    );
                }}
            >
                Save Question
            </button>

            <button
                onClick={() =>
                    props.onCancel()
                }
                style={{ marginLeft: "10px" }}
            >
                Cancel
            </button>
        </div>
    );
}
