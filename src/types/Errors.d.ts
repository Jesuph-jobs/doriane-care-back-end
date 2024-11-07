declare interface ICode<T = string> {
	code: number;
	message: string;
	type: T;
}
declare type IErrors<T extends string | symbol | number = string> = Record<T, ICode<T>>;
// exit codes
declare type IExitCodes =
	| 'SUCCESS'
	| 'ERROR_GENERIC'
	| 'ERROR_INVALID_INPUT'
	| 'ERROR_FILE_NOT_FOUND'
	| 'ERROR_DATABASE_CONNECTION'
	| 'ERROR_DATABASE_DISCONNECTED'
	| 'ERROR_COULD_NOT_READ_FILE'
	| 'ENV_ERROR_COULD_NOT_FIND_FIELD'
	| 'COULD_NOT_LOAD_ROLES'
	| 'EMAIL_ERROR_GENERIC'
	| 'SIGNAL_EXIT_CALL';
