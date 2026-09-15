import { useState } from "react";

interface Props {
    questionText: string;
    category: string;

    onUpdate: (
        questionText: string,
        category: string
    ) => void;

    onCancel: () => void;
}

export default function EditQuestionForm(
    props: Props
) {

    const [questionText, setQuestionText] =
        useState(props.questionText);

    const [category, setCategory] =
        useState(props.category);

    return (

        <div>

            <h2>
                Edit Question
            </h2>

            <div>

                <label>
                    Question Text
                </label>

                <input
                    value={questionText}
                    onChange={(e) =>
                        setQuestionText(
                            e.target.value
                        )
                    }
                />

            </div>

            <br />

            <div>

                <label>
                    Category
                </label>

                <input
                    value={category}
                    onChange={(e) =>
                        setCategory(
                            e.target.value
                        )
                    }
                />

            </div>

            <br />

            <button
                onClick={() =>
                    props.onUpdate(
                        questionText,
                        category
                    )
                }
            >
                Update Question
            </button>

            <button
                onClick={() =>
                    props.onCancel()
                }
            >
                Cancel
            </button>

        </div>

    );
}