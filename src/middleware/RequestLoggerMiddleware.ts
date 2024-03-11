import { injectable } from 'inversify';
import { BaseMiddleware } from 'inversify-express-utils';

import requestDataToMask from '../constants/requestDataToMask.json';
import TYPES from '../constants/types';

import type { ILogger } from '@itsmepetey/mytasystem-logger';
import type { Request, Response, NextFunction } from 'express';

@injectable()
export default class RequestLoggerMiddleware extends BaseMiddleware {
	constructor() {
		super();
	}

	public handler(request: Request, _response: Response, next: NextFunction): void {
		const correlatedLogger = this.httpContext.container.get<ILogger>(TYPES.CorrelatedLogger);

		correlatedLogger.info(
			'Request Incoming',
			correlatedLogger.maskData(
				{
					ip: request.ip,
					body: request.body,
					method: request.method,
					query: request.query,
					url: request.url
				},
				requestDataToMask
			)
		);

		next();
	}
}
