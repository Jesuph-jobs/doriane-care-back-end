import type { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { MongoError } from 'mongodb';
import type { ZodError, ZodSchema } from 'zod';

import { ResponseStatus, ServiceResponse } from '@server/utils/serviceResponse';
export function extractDuplicateKey(errorMessage: string): string {
	const match = errorMessage.match(/index:\s+([^\s]+)/);
	return match ? match[1] : 'unknown';
}
export const handleServiceResponse = <T = any>(serviceResponse: ServiceResponse<T>, response: Response) => {
	return response.status(serviceResponse.statusCode).send(serviceResponse);
};
export function handleErrorResponse(code: number, errorMessage: string, error: unknown, res: Response) {
	const response: ErrorResponseI = error
		? error instanceof MongoError && error.code === 11000
			? {
					message: `Already exist : [${extractDuplicateKey(error.message)}], it's not allowed to use duplicate keys`,
					error,
				}
			: {
					message: (error as Error).message || errorMessage,
					error,
				}
		: {
				message: 'Unknown error',
				error: new Error('Unknown error'),
			};

	handleServiceResponse(
		new ServiceResponse<ErrorResponseI>(ResponseStatus.Failed, errorMessage, response, code),
		res
	);
}
export const validateRequest = (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
	try {
		schema.parse({
			body: req.body,
			query: req.query,
			params: req.params,
			cookies: req.cookies,
			headers: req.headers,
		});
		next();
	} catch (err) {
		handleErrorResponse(
			StatusCodes.BAD_REQUEST,
			`Invalid input: ${(err as ZodError).errors.map(e => e.message).join(', ')}`,
			err,
			res
		);
	}
};
