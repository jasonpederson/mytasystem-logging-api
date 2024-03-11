import Logger from '@itsmepetey/mytasystem-logger';
import { injectable } from 'inversify';
import { BaseMiddleware } from 'inversify-express-utils';

import config from '../config';
import TYPES from '../constants/types';

import type { ILogger, Metadata } from '@itsmepetey/mytasystem-logger';
import type { Request, Response, NextFunction } from 'express';

@injectable()
export default class CorrelatedLoggerMiddleware extends BaseMiddleware {
	public handler(request: Request, _response: Response, next: NextFunction) {
		const trackingId = request.header('X-Tracking-Id');

		const correlatedLogger = new Logger(config.logging, {
			trackingId
		} as Metadata);

		this.bind<ILogger>(TYPES.CorrelatedLogger).toConstantValue(correlatedLogger);

		next();
	}
}
