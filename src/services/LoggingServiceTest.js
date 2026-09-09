const fs = require("fs");
const path = require("path");

const logDir = path.join(process.cwd(), "logs");

if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, {
        recursive: true
    });
}

const logFile = path.join(
    logDir,
    "test.log"
);

fs.appendFileSync(
    logFile,
    "[INFO] Logging Service Test\n"
);

console.log(
    "Log written to:",
    logFile
);