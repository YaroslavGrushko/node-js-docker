var winston = require('winston');
// configuaration file:
var config = require('../config');
var ENV = process.env.NODE_ENV;

function getLogger(module) {
    // use of external librery for timestamp:
    // ==========
    const MESSAGE = Symbol.for('message');
    const jsonFormatter = (logEntry) => {
            const base = { timestamp: new Date() };
            const json = Object.assign(base, logEntry)
            logEntry[MESSAGE] = JSON.stringify(json);
            return logEntry;
        }
        //   ===========

    var path = module.filename.split('/').slice(-2).join('/');

    const logger = winston.createLogger({
        level: 'info',
        // format: winston.format.json(),
        format: winston.format(jsonFormatter)(),
        transports: [
            //
            // - Write to all logs with level `info` and below to `combined.log` 
            // - Write all logs error (and below) to `error.log`.
            //
            new winston.transports.File({
                filename: config.get('log:error-file'),
                level: 'error'
            }),
            new winston.transports.File({
                filename: config.get('log:info-file'),
                label: path
            }),
        ],
    });

    //
    // If we're not in production then log to the `console` with the format:
    // `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
    // 
    if (ENV !== 'production') {
        logger.add(new winston.transports.Console({
            format: winston.format.simple(),
            colorize: true,
            label: path
        }));
    }
    return logger;
}
module.exports = getLogger;