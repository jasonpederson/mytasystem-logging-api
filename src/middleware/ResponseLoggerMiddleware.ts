import { injectable } from 'inversify';
import { BaseMiddleware } from 'inversify-express-utils';

import responseDataToMask from '../constants/responseDataToMask.json';
import TYPES from '../constants/types';

import type { ILogger } from '@itsmepetey/mytasystem-logger';
import type { Request, Response, NextFunction } from 'express';

@injectable()
export default class ResponseLoggerMiddleware extends BaseMiddleware {
	constructor() {
		super();
	}

	public handler(_request: Request, response: Response, next: NextFunction): void {
		const correlatedLogger = this.httpContext.container.get<ILogger>(TYPES.CorrelatedLogger);

		//NOTE: We need to monkey-patch the send function in order to get the response body
		const appResponsePrototype = Object.getPrototypeOf(response);
		const originalSend = appResponsePrototype.send;

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		appResponsePrototype.send = function sendOverwrite(body: any) {
			try {
				originalSend.call(this, body);

				let parsedBody = body;

				try {
					parsedBody = JSON.parse(body);
				} catch (error) {
					// Catch and release as we don't really care if it fails to parse. That just means it's empty or a string/number
				}

				correlatedLogger.info('Request Outgoing', correlatedLogger.maskData(parsedBody, responseDataToMask));
			} catch (error) {
				correlatedLogger.error('Response Logger Middleware Error', error);
			} finally {
				appResponsePrototype.send = originalSend;
			}
		};

		next();
	}
}
