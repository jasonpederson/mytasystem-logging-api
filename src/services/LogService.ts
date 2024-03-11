import { ILogger } from '@itsmepetey/mytasystem-logger';
import { injectable, inject } from 'inversify';

import TYPES from '../constants/types';

import type { LogRequestDTO } from '../dtos/incoming/LogRequestDTO';
import type ILogService from '../interfaces/ILogService';
import type { Metadata, Environment, LogLevels } from '@itsmepetey/mytasystem-logger';

@injectable()
export default class LogService implements ILogService {
	constructor(
		@inject(TYPES.CorrelatedLogger) private readonly _correlatedLogger: ILogger,
		@inject(TYPES.Logger) private readonly _logger: ILogger
	) {}

	log(message: LogRequestDTO) {
		try {
			const impersonatedLogger = this._logger.createNewLogger(
				{
					appName: message.appName,
					appVersion: message.version,
					environment: message.environment as Environment,
					level: message.level as LogLevels
				},
				message.metadata as Metadata
			);

			if (message.level === 'info') {
				impersonatedLogger.info(message.context, message.content, message.timestamp);
			} else if (message.level === 'debug') {
				impersonatedLogger.debug(message.context, message.content, message.timestamp);
			} else if (message.level === 'error') {
				impersonatedLogger.error(message.context, message.content, message.timestamp);
			}
		} catch (error) {
			this._correlatedLogger.error('Log Service Failure', error);
		}
	}
}
