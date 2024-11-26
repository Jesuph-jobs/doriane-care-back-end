export enum ResponseStatus {
	Success = 0,
	Failed = 1,
}

export class ServiceResponse<T = null> implements StaticResponseI<T> {
	success: boolean;
	message: string;
	data: T;
	statusCode: number;

	constructor(status: ResponseStatus, message: string, data: T, statusCode: number) {
		this.success = status === ResponseStatus.Success;
		this.message = message;
		this.data = data;
		this.statusCode = statusCode;
	}
}
export class ServiceResponseList<T = null> extends ServiceResponse<ListOf<T>> {
	success: boolean;
	message: string;
	data: ListOf<T>;
	statusCode: number;
	constructor(status: ResponseStatus, message: string, data: ListOf<T>, statusCode: number) {
		super(status, message, data, statusCode);
		this.success = status === ResponseStatus.Success;
		this.message = message;
		this.data = data;
		this.statusCode = statusCode;
	}
}
