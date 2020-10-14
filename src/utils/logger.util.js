import { createLogger, transports } from 'winston';
import 'winston-daily-rotate-file';
import { logger as loggerConfig } from '../configs';

// Create Log Transports
const logger = createLogger({
  transports: [
    // Log to console
    new transports.Console(loggerConfig.console),

    // Log to file and rotate file daily
    new transports.DailyRotateFile(loggerConfig.file),
  ],
  // Do not exit on handled exceptions
  exitOnError: false,
});

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
  write: function (message, encoding) {
    // use the 'info' log level so the output will be picked up by both transports (file and console)
    logger.info(message);
  },
};

export default logger;

// https://code-examples.net/en/q/249609c
// https://coralogix.com/log-analytics-blog/complete-winston-logger-guide-with-hands-on-examples/
// https://www.digitalocean.com/community/tutorials/how-to-use-winston-to-log-node-js-applications
// https://thisdavej.com/using-winston-a-versatile-logging-library-for-node-js/
// https://www.loggly.com/ultimate-guide/node-logging-basics/
