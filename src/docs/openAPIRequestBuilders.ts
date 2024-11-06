import type { RouteConfig, ZodRequestBody } from '@asteasolutions/zod-to-openapi';
import type { AnyZodObject, ZodTypeAny } from 'zod';

interface ExampleObject<T = any> {
	summary?: string;
	description?: string;
	value?: T | Record<string, any>;
	externalValue?: string;
	[property: string]: any;
}
export function createApiRequest<bodyT = any>({
	body: bodySchema,
	cookies,
	headers,
	params,
	query,
}: {
	body?: {
		description: string;
		schema: ZodTypeAny;
		required?: boolean;
		examples?: Record<string, ExampleObject<bodyT>>;
	};
	cookies?: AnyZodObject;
	headers?: AnyZodObject;
	params?: AnyZodObject;
	query?: AnyZodObject;
}): RouteConfig['request'] {
	const body: ZodRequestBody | undefined = bodySchema
		? {
				description: bodySchema.description,
				content: {
					'application/json': {
						schema: bodySchema.schema,
						examples: bodySchema.examples,
					},
				},
				required: bodySchema.required,
			}
		: undefined;
	return {
		body,
		cookies,
		headers,
		params,
		query,
	};
}
