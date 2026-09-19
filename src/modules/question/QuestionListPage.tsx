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

type SortField = "questionText" | "category" | "difficulty" | "answer";

const questionService = new QuestionService();

export default function QuestionListPage(props: Props) {
    const [questions, setQuestions] = useState<any[]>([]);
    const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [creating, setCreating] = useState(false);
    const [sortField, setSortField] = useState<SortField>("questionText");
    const [sortAscending, setSortAscending] = useState(true);
    const [csvRows, setCsvRows] = useState<QuestionCsvRow[]>([]);
    const [csvErrors, setCsvErrors] = useState<string[]>([]);
    const [importing, setImporting] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        loadQuestions();
    }, []);

    async function loadQuestions() {
        setQuestions(await questionService.getQuestions());
        setSelectedIds([]);
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

    function toggleSelected(questionId: string) {
        setSelectedIds((current) =>
            current.includes(questionId)
                ? current.filter((id) => id !== questionId)
                : [...current, questionId]
        );
    }

    function toggleAllSelected() {
        setSelectedIds((current) =>
            current.length === questions.length
                ? []
                : questions.map((question) => question.id)
        );
    }

    async function deleteQuestions(questionIds: string[]) {
        if (questionIds.length === 0) return;

        const message = questionIds.length === 1
            ? "Delete this question?"
            : `Delete these ${questionIds.length} questions?`;

        if (!window.confirm(message)) return;

        await questionService.deleteQuestions(questionIds);
        await loadQuestions();
    }

    const sortedQuestions = [...questions].sort((left, right) => {
        const leftValue = String(left[sortField] ?? "").toLocaleLowerCase();
        const rightValue = String(right[sortField] ?? "").toLocaleLowerCase();
        const comparison = leftValue.localeCompare(rightValue);
        return sortAscending ? comparison : -comparison;
    });

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

    const allSelected = questions.length > 0 && selectedIds.length === questions.length;

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
            <button
                onClick={() => deleteQuestions(selectedIds)}
                disabled={selectedIds.length === 0}
                style={{ marginLeft: "10px" }}
            >
                Delete Selected ({selectedIds.length})
            </button>

            <div style={{ margin: "20px 0" }}>
                <label htmlFor="question-sort">Sort by: </label>
                <select
                    id="question-sort"
                    value={sortField}
                    onChange={(event) =>
                        setSortField(event.target.value as SortField)
                    }
                >
                    <option value="questionText">Alphabetical / Question</option>
                    <option value="category">Category</option>
                    <option value="difficulty">Difficulty</option>
                    <option value="answer">Answer</option>
                </select>
                <button
                    onClick={() => setSortAscending((current) => !current)}
                    style={{ marginLeft: "10px" }}
                >
                    {sortAscending ? "Ascending ↑" : "Descending ↓"}
                </button>
            </div>

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
                </div>
            )}

            <table border={1} cellPadding={10} style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
                <thead>
                    <tr>
                        <th>
                            <input
                                type="checkbox"
                                checked={allSelected}
                                onChange={toggleAllSelected}
                                aria-label="Select all questions"
                            />
                        </th>
                        <th>Question</th>
                        <th>Category</th>
                        <th>Difficulty</th>
                        <th>Answer</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedQuestions.map((question: any) => (
                        <tr key={question.id}>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={selectedIds.includes(question.id)}
                                    onChange={() => toggleSelected(question.id)}
                                    aria-label={`Select ${question.questionText}`}
                                />
                            </td>
                            <td>{question.questionText}</td>
                            <td>{question.category}</td>
                            <td>{question.difficulty}</td>
                            <td>{question.answer}</td>
                            <td>
                                <button onClick={() => setSelectedQuestion(question.id)}>
                                    View Details
                                </button>
                                <button
                                    onClick={() => deleteQuestions([question.id])}
                                    style={{ marginLeft: "8px" }}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
