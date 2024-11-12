import type { ResponseConfig } from '@asteasolutions/zod-to-openapi';
import { StatusCodes } from 'http-status-codes';
import type { ZodTypeAny } from 'zod';

import { ServiceResponseSchema } from '^common/response';

export function createApiResponse(schema: ZodTypeAny, description: string, statusCode = StatusCodes.OK) {
	return {
		[statusCode]: {
			description,
			content: {
				'application/json': {
					schema: ServiceResponseSchema(schema),
				},
			},
		},
	};
}

// Use if you want multiple responses for a single endpoint

export type ApiResponseConfig = {
	schema: ZodTypeAny;
	description: string;
	statusCode: StatusCodes;
};
export function createApiResponses(configs: ApiResponseConfig[]) {
	const responses: { [key: string]: ResponseConfig } = {};
	configs.forEach(({ schema, description, statusCode }) => {
		responses[statusCode] = {
			description,
			content: {
				'application/json': {
					schema: ServiceResponseSchema(schema),
				},
			},
		};
	});
	return responses;
}
