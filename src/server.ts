import bodyParser from 'body-parser';
import { InversifyExpressServer, getRouteInfo } from 'inversify-express-utils';
import responseTime from 'response-time';

import config from './config';

import type { ILogger } from '@itsmepetey/mytasystem-logger';
import type express from 'express';
import type { Container } from 'inversify';

let _server: InversifyExpressServer;
let _app: express.Application;

export function initialize(container: Container, logger: ILogger) {
	_server = new InversifyExpressServer(container);

	_server.setConfig((app) => {
		app.use(responseTime());
		app.use(bodyParser.json());
		app.use(bodyParser.text());
		app.use(bodyParser.urlencoded({ extended: false }));
	});

	_app = _server.build();

	_app.listen(config.server.port, () => {
		logger.info('Server successfully started', {
			port: config.server.port
		});

		const routeInfo = getRouteInfo(container);

		logger.info('Route map', routeInfo);
	});
}
