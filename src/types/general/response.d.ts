declare interface ResponseI<T = null> {
	success: boolean;
	message: string;
	data: T;
	statusCode: number;
}
