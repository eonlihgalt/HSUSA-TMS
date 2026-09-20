import { useState } from "react";

interface Props {
    onCreate: (questionText: string, category: string, difficulty: string, answer: string) => void;
    onCancel: () => void;
}

export default function CreateQuestionForm(props: Props) {
    const [questionText, setQuestionText] = useState("");
    const [category, setCategory] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [answer, setAnswer] = useState("");

    function submit() {
        if (!questionText.trim()) return;
        props.onCreate(questionText.trim(), category.trim(), difficulty.trim(), answer.trim());
    }

    return (
        <div style={{ padding: "40px" }}>
            <h2>Create Question</h2>
            <label>Question Text<br /><textarea value={questionText} onChange={event => setQuestionText(event.target.value)} rows={5} autoFocus /></label><br /><br />
            <label>Category<br /><input value={category} onChange={event => setCategory(event.target.value)} /></label><br /><br />
            <label>Difficulty<br /><input value={difficulty} onChange={event => setDifficulty(event.target.value)} /></label><br /><br />
            <label>Answer<br /><textarea value={answer} onChange={event => setAnswer(event.target.value)} rows={4} /></label><br /><br />
            <button onClick={submit} disabled={!questionText.trim()}>Save Question</button>
            <button onClick={props.onCancel} style={{ marginLeft: "10px" }}>Cancel</button>
        </div>
    );
}
