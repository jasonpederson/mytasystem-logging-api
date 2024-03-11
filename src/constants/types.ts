const TYPES = {
	Configuration: Symbol.for('Configuration'),
	Logger: Symbol.for('Logger'),
	RequestLoggerMiddleware: Symbol.for('RequestLoggerMiddleware'),
	ResponseLoggerMiddleware: Symbol.for('ResponseLoggerMiddleware'),
	CorrelatedLogger: Symbol.for('CorrelatedLogger'),
	CorrelatedLoggerMiddleware: Symbol.for('CorrelatedLoggerMiddleware'),
	RequestValidatorMiddleware: Symbol.for('RequestValidatorMiddleware'),
	LogService: Symbol.for('LogService')
};

export default TYPES;
