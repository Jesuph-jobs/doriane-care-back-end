export const ExitCodes: IErrors<IExitCodes> = {
	SUCCESS: { code: 0, message: 'Success', type: 'SUCCESS' },
	ERROR_GENERIC: { code: 1, message: "Generic error '{error}'", type: 'ERROR_GENERIC' },
	ERROR_INVALID_INPUT: { code: 2, message: "Invalid input '{input}'", type: 'ERROR_INVALID_INPUT' },
	ERROR_FILE_NOT_FOUND: { code: 3, message: "File not found '{fileName}'", type: 'ERROR_FILE_NOT_FOUND' },
	ERROR_DATABASE_CONNECTION: {
		code: 4,
		message: 'Failed to connect to the database',
		type: 'ERROR_DATABASE_CONNECTION',
	},
	ERROR_DATABASE_DISCONNECTED: {
		code: 5,
		message: 'Database disconnected for a fail {error}',
		type: 'ERROR_DATABASE_DISCONNECTED',
	},
	ERROR_COULD_NOT_READ_FILE: {
		code: 6,
		message: 'Failed to read a file {filePath}',
		type: 'ERROR_COULD_NOT_READ_FILE',
	},
	ENV_ERROR_COULD_NOT_FIND_FIELD: {
		code: 7,
		message: 'Failed to read env field : {field}',
		type: 'ENV_ERROR_COULD_NOT_FIND_FIELD',
	},
	COULD_NOT_LOAD_ROLES: {
		code: 8,
		message: "Couldn't Load roles for this reason {reason}",
		type: 'COULD_NOT_LOAD_ROLES',
	},
	// email issue
	EMAIL_ERROR_GENERIC: { code: 9, message: "Email error '{error}'", type: 'EMAIL_ERROR_GENERIC' },
	SIGNAL_EXIT_CALL: { code: 100, message: 'Exit call with signal {signal}', type: 'SIGNAL_EXIT_CALL' },
} as const;
