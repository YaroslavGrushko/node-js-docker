var winston = require('winston');
var ENV = process.env.NODE_ENV;

function getLogger(module) {
    var path = module.filename.split('/').slice(-2).join('/');

    const logger = winston.createLogger({
        level: 'info',
        format: winston.format.json(),
        transports: [
            //
            // - Write to all logs with level `info` and below to `combined.log` 
            // - Write all logs error (and below) to `error.log`.
            //
            new winston.transports.File({ filename: 'error.log', level: 'error' }),
            new winston.transports.File({ filename: 'combined.log', label: path }),
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