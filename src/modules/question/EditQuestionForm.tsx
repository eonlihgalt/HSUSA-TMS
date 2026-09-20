import { useState } from "react";

interface Props {
    questionText: string;
    category?: string | null;
    difficulty?: string | null;
    answer?: string | null;
    onUpdate: (questionText: string, category: string, difficulty: string, answer: string) => void;
    onCancel: () => void;
}

export default function EditQuestionForm(props: Props) {
    const [questionText, setQuestionText] = useState(props.questionText ?? "");
    const [category, setCategory] = useState(props.category ?? "");
    const [difficulty, setDifficulty] = useState(props.difficulty ?? "");
    const [answer, setAnswer] = useState(props.answer ?? "");

    return (
        <div style={{ padding: "40px" }}>
            <h2>Edit Question</h2>
            <label>Question Text<br /><textarea value={questionText} onChange={event => setQuestionText(event.target.value)} rows={5} autoFocus /></label><br /><br />
            <label>Category<br /><input value={category} onChange={event => setCategory(event.target.value)} /></label><br /><br />
            <label>Difficulty<br /><input value={difficulty} onChange={event => setDifficulty(event.target.value)} /></label><br /><br />
            <label>Answer<br /><textarea value={answer} onChange={event => setAnswer(event.target.value)} rows={4} /></label><br /><br />
            <button disabled={!questionText.trim()} onClick={() => props.onUpdate(questionText.trim(), category.trim(), difficulty.trim(), answer.trim())}>Update Question</button>
            <button onClick={props.onCancel} style={{ marginLeft: "10px" }}>Cancel</button>
        </div>
    );
}
