import httpStatusCodes from 'http-status-codes';

import type express from 'express';
import type { ZodError, z } from 'zod';

type RequestValidation<T extends z.ZodTypeAny, U extends z.ZodTypeAny, V extends z.ZodTypeAny> = {
	body?: T;
	params?: U;
	query?: V;
};

export default function requestValidatorMiddleware<
	T extends z.ZodTypeAny,
	U extends z.ZodTypeAny,
	V extends z.ZodTypeAny
>(requestSchemas: RequestValidation<T, U, V>) {
	return (
		request: express.Request,
		response: express.Response,
		next: express.NextFunction
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	): express.Response<any, Record<string, any>> | void => {
		try {
			if (requestSchemas.body) {
				requestSchemas.body.parse(request.body);
			}

			if (requestSchemas.params) {
				requestSchemas.params.parse(request.params);
			}

			if (requestSchemas.query) {
				requestSchemas.query.parse(request.query);
			}
		} catch (error) {
			return response.status(httpStatusCodes.BAD_REQUEST).send((error as ZodError).issues);
		}

		next();
	};
}
