module.exports = process.env.NODO_ENV !== 'production' ? require('./development') : require('./production');
