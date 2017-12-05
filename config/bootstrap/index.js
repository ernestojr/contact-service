const run = process.env.NODO_ENV !== 'production' ? require('./development') : require('./production');
module.exports = run();
