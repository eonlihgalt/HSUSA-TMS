import { LoggingService }
from "./LoggingService";

const logger =
    new LoggingService();

logger.info(
    "Application started."
);

logger.warn(
    "Test warning."
);

logger.error(
    "Test error."
);

logger.security(
    "Test login attempt."
);

logger.audit(
    "User created."
);