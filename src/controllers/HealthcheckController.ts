import express from 'express';
import { controller, httpGet, request, response, BaseHttpController, results } from 'inversify-express-utils';

import TYPES from '../constants/types';

@controller('/healthcheck')
export class HealthcheckController extends BaseHttpController {
	constructor() {
		super();
	}

	@httpGet('/', TYPES.CorrelatedLoggerMiddleware)
	public index(
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		@request() _request: express.Request,
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		@response() _response: express.Response
	): results.OkNegotiatedContentResult<string> {
		return this.ok('Healthy!');
	}
}
