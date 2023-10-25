const log4js = require('log4js');

log4js.configure({
  appenders: {
    console: {type: 'console', layout: {type: 'coloured'}
    }
  },
  categories: {
    default: {
      appenders: ['console'], level: 'all'
    }
  }
});

const logger = log4js.getLogger();
export default logger;
