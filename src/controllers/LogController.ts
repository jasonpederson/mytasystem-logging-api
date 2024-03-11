import express from 'express';
import { inject } from 'inversify';
import { BaseHttpController, controller, request, requestBody, response, httpPost } from 'inversify-express-utils';

import TYPES from '../constants/types';
import { LogBulkRequestDTO, logBulkRequestDTOSchema } from '../dtos/incoming/LogBulkRequestDTO';
import { LogRequestDTO, logRequestDTOSchema } from '../dtos/incoming/LogRequestDTO';
import requestValidatorMiddleware from '../middleware/requestValidatorMiddleware';
import LogService from '../services/LogService';

import type { results } from 'inversify-express-utils';

@controller(
	'/api/v1/log',
	TYPES.CorrelatedLoggerMiddleware,
	TYPES.RequestLoggerMiddleware
	// TYPES.ResponseLoggerMiddleware
)
export class ExternalCallController extends BaseHttpController {
	constructor(@inject(TYPES.LogService) private readonly _service: LogService) {
		super();
	}

	@httpPost('/', requestValidatorMiddleware({ body: logRequestDTOSchema }))
	public log(
		@request() _request: express.Request,
		@response() _response: express.Response,
		@requestBody() body: LogRequestDTO
	): results.OkResult | results.InternalServerErrorResult {
		let result: results.OkResult | results.ExceptionResult = this.ok();

		try {
			this._service.log(body);
		} catch (error) {
			result = this.internalServerError(error as Error);
		}

		return result;
	}

	@httpPost('/bulk', requestValidatorMiddleware({ body: logBulkRequestDTOSchema }))
	public logBulk(
		@request() _request: express.Request,
		@response() _response: express.Response,
		@requestBody() body: LogBulkRequestDTO
	): results.OkResult | results.InternalServerErrorResult {
		let result: results.OkResult | results.ExceptionResult = this.ok();

		try {
			for (let i = 0; i < body.length; i++) {
				this._service.log(body[i]);
			}
		} catch (error) {
			result = this.internalServerError(error as Error);
		}

		return result;
	}
}
