import type { LoggerConfiguration } from '@itsmepetey/mytasystem-logger';

type AppConfiguration = {
	logging: LoggerConfiguration;
	server: {
		port: number;
	};
};

export default AppConfiguration;
