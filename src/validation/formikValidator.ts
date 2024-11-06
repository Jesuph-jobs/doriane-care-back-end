import { ZodError, type ZodTypeAny } from 'zod';

export function SchemaValidator<T>(schema: ZodTypeAny) {
	return (values: T) => {
		try {
			schema.parse(values);
		} catch (error) {
			if (error instanceof ZodError) {
				return error.formErrors.fieldErrors;
			}
		}
	};
}
