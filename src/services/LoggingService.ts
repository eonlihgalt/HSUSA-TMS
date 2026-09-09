import fs from "fs";
import path from "path";

export type LogLevel =
    | "INFO"
    | "WARN"
    | "ERROR"
    | "SECURITY"
    | "AUDIT";

export class LoggingService {

    private readonly logDirectory: string;

    constructor() {

        this.logDirectory = path.join(
            process.cwd(),
            "logs"
        );

        this.ensureLogDirectoryExists();
    }

    private ensureLogDirectoryExists(): void {

        if (!fs.existsSync(this.logDirectory)) {

            fs.mkdirSync(
                this.logDirectory,
                { recursive: true }
            );
        }
    }

    private buildLogFilePath(): string {

        const today =
            new Date()
                .toISOString()
                .slice(0, 10);

        return path.join(
            this.logDirectory,
            `${today}.log`
        );
    }

    private write(
        level: LogLevel,
        message: string
    ): void {

        const timestamp =
            new Date().toISOString();

        const entry =
            `[${timestamp}] [${level}] ${message}\n`;

        fs.appendFileSync(
            this.buildLogFilePath(),
            entry,
            "utf8"
        );

        console.log(entry.trim());
    }

    public info(
        message: string
    ): void {

        this.write(
            "INFO",
            message
        );
    }

    public warn(
        message: string
    ): void {

        this.write(
            "WARN",
            message
        );
    }

    public error(
        message: string
    ): void {

        this.write(
            "ERROR",
            message
        );
    }

    public security(
        message: string
    ): void {

        this.write(
            "SECURITY",
            message
        );
    }

    public audit(
        message: string
    ): void {

        this.write(
            "AUDIT",
            message
        );
    }
}