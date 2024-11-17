import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { StatusCodes } from 'http-status-codes';

import { errorSchema, nullElementSchema } from '^common/elements';
import { AuthResponseSchema, DefaultPublicUserSchema, LoginRequestSchema } from '^common/generated/user';

import { createApiRequest } from '~server/openAPIRequestBuilders';
import { createApiResponses } from '~server/openAPIResponseBuilders';

const authRegistry = new OpenAPIRegistry();

authRegistry.registerPath({
	method: 'get',
	path: '/auth',
	description: 'Check if user is logged in',
	summary: 'Check if user is logged in',
	tags: ['Auth'],
	responses: createApiResponses([
		{
			statusCode: StatusCodes.OK,
			schema: DefaultPublicUserSchema,
			description: 'User is logged in',
		},
		{
			statusCode: StatusCodes.UNAUTHORIZED,
			schema: nullElementSchema({ description: "User is null because it isn't logged in" }),
			description: "User isn't logged in",
		},
		{
			statusCode: StatusCodes.BAD_REQUEST,
			schema: errorSchema(),
			description: 'Invalid Token',
		},
	]),
});

authRegistry.registerPath({
	method: 'delete',
	description: 'Logout user',
	summary: 'Logout user',
	path: '/auth',
	tags: ['Auth'],
	responses: createApiResponses([
		{
			statusCode: StatusCodes.OK,
			schema: nullElementSchema({ description: 'User is logged out' }),
			description: 'User is logged out',
		},
	]),
});

authRegistry.registerPath({
	method: 'post',
	path: '/auth/login',
	description: 'Login user',
	summary: 'Login user',
	tags: ['Auth'],
	request: createApiRequest({
		body: {
			schema: LoginRequestSchema,
			description: 'Login data',
			examples: {
				'Valid example': {
					summary: 'Valid user login with acceptable password length',
					value: {
						username: 'Jesuph',
						password: 'password1',
					},
					description: 'Valid user login data',
				},
				'Invalid example': {
					summary: 'Invalid user login with short password',
					value: {
						username: 'Jesuph',
						password: 'pass',
					},
					description: 'Invalid user login data',
				},
			},
		},
	}),
	responses: createApiResponses([
		{
			statusCode: StatusCodes.OK,
			schema: AuthResponseSchema,
			description: 'User is logged in',
		},
		{
			statusCode: StatusCodes.BAD_REQUEST,
			schema: errorSchema({ message: { description: 'Invalid credentials' } }),
			description: 'Invalid credentials',
		},
	]),
});

/* authRegistry.registerPath({
	method: 'post',
	path: '/auth/register',
	summary: 'Register user',
	description: 'Register user',
	tags: ['Auth'],
	request: createApiRequest({
		body: {
			schema: RegisterRequestSchema,
			description: 'Register data',
			examples: {},
		},
	}),
	responses: createApiResponses([
		{
			statusCode: StatusCodes.OK,
			schema: AuthResponseSchema,
			description: 'User is logged in',
		},
		{
			statusCode: StatusCodes.BAD_REQUEST,
			schema: errorSchema({
				message: { description: 'User could not be registered' },
			}),
			description: 'User could not be registered',
		},
	]),
}); */

export default authRegistry;
