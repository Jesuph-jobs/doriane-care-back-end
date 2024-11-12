import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
/* import { StatusCodes } from 'http-status-codes';

import { errorSchema, nullElementSchema } from '^common/elements';
import {
	OTPSessionRequestSchema,
	ResetPasswordRequestSchema,
	SendOTPSessionGetSchema,
	SendOTPSessionSchema,
} from '^common/generated/otpSession'; */

/* import { createApiRequest } from '~server/openAPIRequestBuilders';
import { createApiResponses } from '~server/openAPIResponseBuilders';
 */
const recoverRegistry = new OpenAPIRegistry();
/* 
recoverRegistry.registerPath({
	method: 'get',
	path: '/auth/recover',
	description: 'Check a recovery session',
	summary: 'Check a recovery session if it exists',
	tags: ['Recover'],
	request: createApiRequest({
		query: DefaultRecoverySessionSendSchema,
	}),
	responses: createApiResponses([
		{
			statusCode: StatusCodes.OK,
			schema: DefaultRecoverySessionResponseSchema,
			description: 'Recovery session exists',
		},
		{
			statusCode: StatusCodes.BAD_REQUEST,
			schema: errorSchema({
				message: { description: 'User not found' },
			}),
			description: 'Recovery session not found',
		},
		{
			statusCode: StatusCodes.BAD_REQUEST,
			schema: errorSchema({
				message: { description: 'Session not found' },
			}),
			description: 'Recovery session not found',
		},
		{
			statusCode: StatusCodes.BAD_REQUEST,
			schema: errorSchema({
				message: { description: 'User is not enabled' },
			}),
			description: 'Recovery session not found',
		},
	]),
});

recoverRegistry.registerPath({
	method: 'post',
	description: 'Create a recovery session',
	summary: 'Create a recovery session',
	path: '/auth/recover',
	tags: ['Recover'],
	request: createApiRequest({
		body: {
			schema: DefaultRecoverySessionSchema,
			required: true,
			description: 'The username or email of the person wanting to recover his account',
		},
	}),
	responses: createApiResponses([
		{
			statusCode: StatusCodes.OK,
			schema: DefaultRecoverySessionResponseSchema,
			description: 'Recovery session created',
		},
		{
			statusCode: StatusCodes.FORBIDDEN,
			schema: errorSchema({
				message: { description: 'User is not enabled' },
			}),
			description: 'Coud not create recovery session',
		},
		{
			statusCode: StatusCodes.BAD_REQUEST,
			schema: errorSchema({
				message: { description: 'User not found' },
			}),
			description: 'Coud not create recovery session',
		},
	]),
});

recoverRegistry.registerPath({
	method: 'post',
	path: '/auth/recover/email',
	description: 'Send recovery email',
	summary: 'Send recovery email',
	tags: ['Recover'],
	request: createApiRequest({
		body: {
			schema: DefaultRecoverySessionSendSchema,
			description: 'The session id',
			examples: {
				'Valid example': {
					summary: 'Valid session id',
					value: {
						sessionId: '5f9d3e3e3e3e3e3e3e3e3e3e',
					},
					description: 'Valid session id',
				},
			},
		},
	}),
	responses: createApiResponses([
		{
			statusCode: StatusCodes.OK,
			schema: nullElementSchema({ description: 'Recovery email sent' }),
			description: 'Recovery email sent',
		},
		{
			statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
			schema: errorSchema({ message: { description: 'Invalid credentials' } }),
			description: 'Recovery email could not be sent',
		},
		{
			statusCode: StatusCodes.BAD_REQUEST,
			schema: errorSchema({ message: { description: 'Recovery session not found' } }),
			description: 'Recovery email could not be sent',
		},
	]),
});

recoverRegistry.registerPath({
	method: 'post',
	path: '/auth/recover/reset',
	summary: 'Reset password',
	description: 'Reset password',
	tags: ['Recover'],
	request: createApiRequest<ResetPasswordI>({
		body: {
			schema: DefaultResetPasswordSchema,
			description: 'The session id, secret key and the new password',
			examples: {
				'valid example': {
					description: 'Valid reset password data',
					value: {
						sessionId: '5f9d3e3e3e3e3e3e3e3e3e3e',
						password: 'password1',
						confirmPassword: 'password1',
						secretKey: 'secretMsg',
					},
				},
			},
		},
	}),
	responses: createApiResponses([
		{
			statusCode: StatusCodes.OK,
			schema: nullElementSchema({ description: 'Password reset successfully' }),
			description: 'Password reset successfully',
		},
		{
			statusCode: StatusCodes.BAD_REQUEST,
			schema: errorSchema({
				message: { example: 'Session not found' },
			}),
			description: 'Password could not be reset',
		},
		{
			statusCode: StatusCodes.BAD_REQUEST,
			schema: errorSchema({
				message: { example: 'User not found' },
			}),
			description: 'Password could not be reset',
		},
	]),
}); */

export default recoverRegistry;
