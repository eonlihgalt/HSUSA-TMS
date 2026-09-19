export interface QuestionCsvRow {
    questionText: string;
    category: string;
    difficulty: string;
    answer: string;
}

function parseCsvLine(line: string): string[] {
    const values: string[] = [];
    let value = "";
    let quoted = false;

    for (let index = 0; index < line.length; index += 1) {
        const character = line[index];

        if (character === '"') {
            if (quoted && line[index + 1] === '"') {
                value += '"';
                index += 1;
            } else {
                quoted = !quoted;
            }
        } else if (character === "," && !quoted) {
            values.push(value.trim());
            value = "";
        } else {
            value += character;
        }
    }

    values.push(value.trim());
    return values;
}

export function parseQuestionsCsv(csv: string): {
    rows: QuestionCsvRow[];
    errors: string[];
} {
    const lines = csv
        .replace(/^\uFEFF/, "")
        .split(/\r?\n/)
        .filter((line) => line.trim().length > 0);

    if (lines.length === 0) {
        return { rows: [], errors: ["The CSV file is empty."] };
    }

    const headers = parseCsvLine(lines[0]).map((header) =>
        header.toLowerCase()
    );
    const questionTextIndex = headers.indexOf("questiontext");

    if (questionTextIndex === -1) {
        return {
            rows: [],
            errors: ["The CSV must contain a questionText column."]
        };
    }

    const categoryIndex = headers.indexOf("category");
    const difficultyIndex = headers.indexOf("difficulty");
    const answerIndex = headers.indexOf("answer");
    const rows: QuestionCsvRow[] = [];
    const errors: string[] = [];

    lines.slice(1).forEach((line, lineOffset) => {
        const values = parseCsvLine(line);
        const questionText = values[questionTextIndex]?.trim() ?? "";

        if (!questionText) {
            errors.push(`Row ${lineOffset + 2}: questionText is required.`);
            return;
        }

        rows.push({
            questionText,
            category: categoryIndex >= 0 ? values[categoryIndex] ?? "" : "",
            difficulty: difficultyIndex >= 0 ? values[difficultyIndex] ?? "" : "",
            answer: answerIndex >= 0 ? values[answerIndex] ?? "" : ""
        });
    });

    return { rows, errors };
}

function escapeCsvValue(value: unknown): string {
    const text = String(value ?? "");
    return /[",\n\r]/.test(text)
        ? `"${text.replace(/"/g, '""')}"`
        : text;
}

export function questionsToCsv(questions: any[]): string {
    const header = "questionText,category,difficulty,answer";
    const rows = questions.map((question) =>
        [
            question.questionText,
            question.category,
            question.difficulty,
            question.answer
        ].map(escapeCsvValue).join(",")
    );

    return [header, ...rows].join("\n");
}
