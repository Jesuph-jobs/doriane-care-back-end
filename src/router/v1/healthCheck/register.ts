import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';

import { nullElementSchema } from '^common/elements';

import { createApiRequest } from '~server/openAPIRequestBuilders';
import { createApiResponse } from '~server/openAPIResponseBuilders';

const healthCheckRegistry = new OpenAPIRegistry();
healthCheckRegistry.registerPath({
	method: 'get',
	path: '/health-check',
	tags: ['Health Check'],
	request: createApiRequest({}),
	responses: createApiResponse(nullElementSchema('en'), 'Success'),
});

export default healthCheckRegistry;
