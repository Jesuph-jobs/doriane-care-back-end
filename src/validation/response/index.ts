import type { ZodTypeAny } from 'zod';

import { z } from '../../../common/validations/defaultZod';

export const ServiceResponseSchema = <T extends ZodTypeAny>(dataSchema: T, example: z.infer<T> = {}) =>
	z
		.object({
			success: z.boolean(),
			message: z.string(),
			data: dataSchema.optional(),
			statusCode: z.number(),
		})
		.openapi('Response_Schema', {
			description: 'A response from the server',
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			example: {
				success: true,
				message: 'Success',
				data: example,
				statusCode: 200,
			},
		});
