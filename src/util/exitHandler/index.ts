import type { ILogger } from '@itsmepetey/mytasystem-logger';

let _logger: ILogger;

let _cleanup;
let _exitHandler;

let exitTimeout: NodeJS.Timeout;

async function defaultExitHandler(reason, error, p) {
	let unhandledError;

	if (error) {
		unhandledError = error;
	} else {
		if (p) {
			unhandledError = p;
		} else {
			unhandledError = 'N/A';
		}
	}

	_logger.error(
		'Exit Handler',
		JSON.stringify({
			reason,
			message: unhandledError.message,
			stack: unhandledError.stack
		})
	);

	if (_cleanup) {
		try {
			await _cleanup();
		} catch (error) {
			_logger.error('Cleanup Error', error);
		}
	}

	// Delay exit for 3 seconds to allow log to finish
	if (!exitTimeout) {
		exitTimeout = setTimeout(() => {
			process.exit(1);
		}, 5000);
	}
}

function registerEvents() {
	process.on('unhandledRejection', async (error, p) => {
		await _exitHandler('unhandledRejection', error, p);
	});

	process.on('uncaughtException', async (error) => {
		await _exitHandler('uncaughtException', error);
	});

	process.on('SIGABRT', async (error) => {
		await _exitHandler('SIGABRT', error);
	});

	process.on('SIGHUP', async (error) => {
		await _exitHandler('SIGHUP', error);
	});

	process.on('SIGINT', async (error) => {
		await _exitHandler('SIGINT', error);
	});

	process.on('SIGQUIT', async (error) => {
		await _exitHandler('SIGQUIT', error);
	});

	process.on('SIGTERM', async (error) => {
		await _exitHandler('SIGTERM', error);
	});

	process.on('SIGUSR1', async (error) => {
		await _exitHandler('SIGUSR1', error);
	});

	process.on('SIGUSR2', async (error) => {
		await _exitHandler('SIGUSR2', error);
	});
}

export default function configure(logger: ILogger, cleanup?, exitHandler = defaultExitHandler): void {
	_cleanup = cleanup;
	_exitHandler = exitHandler;

	_logger = logger;

	registerEvents();
}
