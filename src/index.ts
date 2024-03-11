import '@abraham/reflection';
import Logger from '@itsmepetey/mytasystem-logger';

import config from './config';
import configVariablesToMask from './constants/configVariablesToMask.json';
import environmentVariablesToMask from './constants/environmentVariablesToMask.json';
import { initializeContainer } from './inversify.config';
import * as server from './server';
import configureExitHandler from './util/exitHandler';

import type { ILogger } from '@itsmepetey/mytasystem-logger';

let logger: ILogger | undefined;

function initialize(logger: ILogger): void {
	logger.initialize(config, configVariablesToMask, environmentVariablesToMask);
}

function run(logger: ILogger): void {
	const container = initializeContainer();

	server.initialize(container, logger);
}

try {
	logger = new Logger(config.logging);

	configureExitHandler(logger);

	initialize(logger);

	run(logger);
} catch (error) {
	if (logger) {
		logger.error('Top Level Failure', error);
	} else {
		console.error(error);
	}
}
