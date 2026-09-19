import { useEffect, useRef, useState } from "react";
import { QuestionService } from "./QuestionService";
import QuestionDetailPage from "./QuestionDetailPage";
import CreateQuestionForm from "./CreateQuestionForm";
import {
    parseQuestionsCsv,
    questionsToCsv,
    QuestionCsvRow
} from "./question-csv";

interface Props {
    onBack: () => void;
}

const questionService = new QuestionService();

export default function QuestionListPage(props: Props) {
    const [questions, setQuestions] = useState<any[]>([]);
    const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
    const [creating, setCreating] = useState(false);
    const [csvRows, setCsvRows] = useState<QuestionCsvRow[]>([]);
    const [csvErrors, setCsvErrors] = useState<string[]>([]);
    const [importing, setImporting] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        loadQuestions();
    }, []);

    async function loadQuestions() {
        setQuestions(await questionService.getQuestions());
    }

    async function createQuestion(
        questionText: string,
        category: string,
        difficulty: string,
        answer: string
    ) {
        await questionService.createQuestion(
            questionText, category, difficulty, answer
        );
        await loadQuestions();
        setCreating(false);
    }

    async function handleCsvSelected(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        const file = event.target.files?.[0];
        if (!file) return;

        const result = parseQuestionsCsv(await file.text());
        setCsvRows(result.rows);
        setCsvErrors(result.errors);
    }

    async function importCsv() {
        if (csvRows.length === 0 || csvErrors.length > 0) return;
        setImporting(true);
        try {
            await questionService.importQuestions(csvRows);
            await loadQuestions();
            setCsvRows([]);
            setCsvErrors([]);
            if (fileInputRef.current) fileInputRef.current.value = "";
        } finally {
            setImporting(false);
        }
    }

    function exportCsv() {
        const blob = new Blob([questionsToCsv(questions)], {
            type: "text/csv;charset=utf-8;"
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "questions.csv";
        link.click();
        URL.revokeObjectURL(url);
    }

    if (creating) {
        return (
            <CreateQuestionForm
                onCreate={createQuestion}
                onCancel={() => setCreating(false)}
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
            <button onClick={props.onBack} style={{ marginBottom: "20px" }}>
                ← Back To Main Menu
            </button>

            <h1>Question Bank</h1>

            <button onClick={() => setCreating(true)}>+ Create New Question</button>
            <button onClick={exportCsv} style={{ marginLeft: "10px" }}>
                Export CSV
            </button>

            <div style={{ margin: "20px 0" }}>
                <label htmlFor="question-csv">Import CSV: </label>
                <input
                    id="question-csv"
                    ref={fileInputRef}
                    type="file"
                    accept=".csv,text/csv"
                    onChange={handleCsvSelected}
                />
            </div>

            {csvRows.length > 0 && (
                <div>
                    <h2>Import Preview ({csvRows.length} rows)</h2>
                    {csvErrors.length > 0 && (
                        <ul style={{ color: "darkred" }}>
                            {csvErrors.map((error) => <li key={error}>{error}</li>)}
                        </ul>
                    )}
                    <button
                        disabled={csvErrors.length > 0 || importing}
                        onClick={importCsv}
                    >
                        {importing ? "Importing..." : "Confirm Import"}
                    </button>
                    <table border={1} cellPadding={6} style={{ marginTop: "10px" }}>
                        <thead><tr><th>Question</th><th>Category</th><th>Difficulty</th><th>Answer</th></tr></thead>
                        <tbody>
                            {csvRows.slice(0, 10).map((row, index) => (
                                <tr key={`${row.questionText}-${index}`}>
                                    <td>{row.questionText}</td>
                                    <td>{row.category}</td>
                                    <td>{row.difficulty}</td>
                                    <td>{row.answer}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <table border={1} cellPadding={10} style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
                <thead><tr><th>Question</th><th>Category</th><th>Difficulty</th><th>Actions</th></tr></thead>
                <tbody>
                    {questions.map((question: any) => (
                        <tr key={question.id}>
                            <td>{question.questionText}</td>
                            <td>{question.category}</td>
                            <td>{question.difficulty}</td>
                            <td><button onClick={() => setSelectedQuestion(question.id)}>View Details</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
