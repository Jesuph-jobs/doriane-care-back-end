import type { AnyZodObject, ZodType } from 'zod';

export interface RequestShape {
	body?: AnyZodObject;
	params?: AnyZodObject;
	query?: AnyZodObject;
	cookies?: AnyZodObject;
	headers?: AnyZodObject | ZodType<unknown>[];
}
