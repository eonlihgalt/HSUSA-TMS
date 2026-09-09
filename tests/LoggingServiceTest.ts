import { LoggingService }
    from "../src/services/LoggingService";

const logger =
    new LoggingService();

logger.info(
    "Logging test"
);

console.log(
    "Logging Complete"
);