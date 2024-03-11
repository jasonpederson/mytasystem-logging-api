import Logger from '@itsmepetey/mytasystem-logger';
import { Container } from 'inversify';

import config from './config';
import TYPES from './constants/types';
import CorrelatedLoggerMiddleware from './middleware/CorrelatedLoggerMiddleware';
import RequestLoggerMiddleware from './middleware/RequestLoggerMiddleware';
import ResponseLoggerMiddleware from './middleware/ResponseLoggerMiddleware';
import LogService from './services/LogService';

// Import controllers
import './controllers/HealthcheckController';
import './controllers/LogController';
import type ILogService from './interfaces/ILogService';
import type AppConfiguration from './types/AppConfiguration';
import type { ILogger } from '@itsmepetey/mytasystem-logger';

let _container: Container;

export function initializeContainer(): Container {
	_container = new Container();

	_container.bind<AppConfiguration>(TYPES.Configuration).toConstantValue(config);

	_container.bind<ILogger>(TYPES.Logger).toConstantValue(new Logger(config.logging));

	_container.bind<RequestLoggerMiddleware>(TYPES.RequestLoggerMiddleware).to(RequestLoggerMiddleware);
	_container.bind<CorrelatedLoggerMiddleware>(TYPES.CorrelatedLoggerMiddleware).to(CorrelatedLoggerMiddleware);
	_container.bind<ResponseLoggerMiddleware>(TYPES.ResponseLoggerMiddleware).to(ResponseLoggerMiddleware);

	_container.bind<ILogService>(TYPES.LogService).to(LogService);

	//NOTE: We need to initialize request-scope bindings to something
	_container.bind<ILogger>(TYPES.CorrelatedLogger).toConstantValue(new Logger(config.logging));

	return _container;
}

//TODO: Add unloading for when the program is exiting
