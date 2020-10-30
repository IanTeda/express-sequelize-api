/**
 * Winston logger configuration
 *
 * @memberof module:configs/logger
 */

import appRoot from 'app-root-path';
import { format } from 'winston';


const { combine, colorize, timestamp, printf, json } = format;

// Set level and silent based on process environment
let level, silent;
switch (process.env.NODE_ENV) {
  case "production":
    level = "warning";
    silent = false;
    break;
  case "development":
    level = "debug";
    silent = false;
    break;
  case "test":
    level = "emerg";
    silent = true;
    break;
  default:
    level = "debug";
    silent = false;
    break;
}

/**
 * What will the print line look like for console output
 * @ignore
 */
const _myConsoleFormat = combine(
  // Adjust time stamp format
  timestamp({
    format: 'YYYY-MM-DD HH:mm:ss'
  }),
  // Colorize the console output
  colorize({ all: true }),
  // Use custom line output
  printf(({ timestamp, level, label, message }) => {
    return `${timestamp} [${level}]: ${message}`;
  }),
);

/**
 * What will the print line look like for log file output
 * @ignore
 */
const _myLogFileFormat = combine(
  timestamp(),
  colorize(),
  json(),
)

// define the custom settings for each transport (file, console)
const config = {
  console: {
    level: level,
    silent: silent,
    handleExceptions: true,
    format: _myConsoleFormat
  },
  file : {
    level: level,
    silent: silent,
    datePattern: 'YYYY-MM-DD',
    filename: `${appRoot}/logs/%DATE%.log`,
    handleExceptions: true,
    maxSize: '20m',
    maxFiles: '30d',
    colorize: false,
    format: _myLogFileFormat,
  }
};

export default config;

// https://code-examples.net/en/q/249609c
