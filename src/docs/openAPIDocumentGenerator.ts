import { OpenAPIRegistry, OpenApiGeneratorV31 } from '@asteasolutions/zod-to-openapi';

import appsRegistry from '@server/router/v1/auth/apps/register';
import recoverRegistry from '@server/router/v1/auth/recover/register';
import authRegistry from '@server/router/v1/auth/register';
import healthCheckRegistry from '@server/router/v1/healthCheck/register';

function generateOpenAPIDocument() {
	const registry = new OpenAPIRegistry([healthCheckRegistry, authRegistry, recoverRegistry, appsRegistry]);
	const generator = new OpenApiGeneratorV31(registry.definitions);

	return generator.generateDocument({
		openapi: '3.1.0',
		info: {
			version: '0.0.1',
			title: 'FY app API',
		},
		externalDocs: {
			description: 'View the raw OpenAPI Specification in JSON format',
			url: '/docs/v1/swagger.json',
		},
	});
}
const openAPIDocument = generateOpenAPIDocument();
export default openAPIDocument;
