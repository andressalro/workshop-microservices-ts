import * as winston from 'winston';

export const logger = winston.createLogger({
    transports: [
      new winston.transports.Console(),
    ]
  });

const env = 'development';
const console = new winston.transports.Console({
    handleExceptions: true, 
    level: 'verbose', 
    format: winston.format.combine(
        winston.format.colorize(), 
        winston.format.prettyPrint()),
    
    });
// Development Logger
if(env === 'development') {
  logger.add(console);
}

process.on('unhandledRejection', function (reason, p) {
  logger.warn('system level exceptions at, Possibly Unhandled Rejection at: Promise ', p, ' reason: ', reason);
});