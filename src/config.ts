import { LogLevels, Environment } from '@itsmepetey/mytasystem-logger';
import dotenv from 'dotenv';

import { name, version } from '../package.json';

import type AppConfiguration from './types/AppConfiguration';

dotenv.config();

const config: AppConfiguration = {
	logging: {
		appName: name,
		appVersion: version,
		environment: (process.env.NODE_ENV as Environment) || Environment.local,
		level: (process.env.LOG_LEVEL as LogLevels) || LogLevels.info
	},
	server: {
		port: parseInt(process.env.SERVER_PORT || '') || 3000
	}
};

export default config;
