const log4js = require('log4js');

log4js.configure({
  appenders: {
    console: {type: 'console', layout: {type: 'colored'}
    },
    file: {
      type: 'dateFile',
      filename: 'logs/',
      pattern: 'yyyyMM',
      alwaysIncludePattern: true
    }
  },
  categories: {
    default: {
      appenders: ['console'], level: 'all'
    }
  }
});

const logger = log4js.getLogger("default");
export default logger;