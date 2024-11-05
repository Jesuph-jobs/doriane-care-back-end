import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { emailQueueService } from '@server/services';
import EmailQueueService from '@server/services/EmailQueue';
import { handleErrorResponse, handleServiceResponse } from '@server/utils/httpHandlers';
import { ResponseStatus, ServiceResponse } from '@server/utils/serviceResponse';

import { ERequest } from '!server/back/E_Express';
import otpSessionModel from '#server/otpSession';

export const createRecoveringSession = async (
	req: ERequest<null, any, ResponseI<string>, OTPSessionI>,
	res: Response<ResponseI<string>>
) => {
	const { email } = req.body;
	try {
		const [key, session, user] = await otpSessionModel.createRecoverySession(email);

		// todo: send email with key
		const language = (req.headers['accept-language'] || 'EN') as LanguagesI;
		await emailQueueService.sendEmail(
			EmailQueueService.RecoveryEmail(user.toNecessaryUser(false), language, session, key)
		);
		handleServiceResponse(
			new ServiceResponse<string>(
				ResponseStatus.Success,
				'Recovery session created',
				session._id.toString(),
				StatusCodes.CREATED
			),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.BAD_REQUEST, 'Unable to create a recovery session', e, res);
	}
};
export const getOTPSession = async (
	req: ERequest<null, any, ResponseI<OTPSessionResponseI>, object, OTPSessionSendI>,
	res: Response<ResponseI<OTPSessionResponseI>>
) => {
	const { sessionId, otpCode } = req.query;
	try {
		const [session, user] = await otpSessionModel.getNecessarySession(sessionId, otpCode);
		handleServiceResponse(
			new ServiceResponse<OTPSessionResponseI>(
				ResponseStatus.Success,
				' Recovery session found',
				{ sessionId: session._id.toString(), user },
				StatusCodes.OK
			),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.NOT_FOUND, 'Recovery session not found', e, res);
	}
};
export const resetPassword = async (
	req: ERequest<null, any, ResponseI<null>, ResetPasswordI>,
	res: Response<ResponseI<null>>
) => {
	const { sessionId, password, otpCode } = req.body;
	try {
		await otpSessionModel.resetPassword(sessionId, password, otpCode);
		handleServiceResponse(
			new ServiceResponse<null>(
				ResponseStatus.Success,
				'Password reset successful',
				null,
				StatusCodes.OK
			),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Password could not be reset", e, res);
	}
};
/* Validation */

export const resendValidation = async (
	req: ERequest<null, any, ResponseI<string>, OTPSessionI>,
	res: Response<ResponseI<string>>
) => {
	const { email } = req.body;
	try {
		const [key, session, user] = await otpSessionModel.createValidationSession(email);

		// todo: send email with key
		const language = (req.headers['accept-language'] || 'EN') as LanguagesI;
		await emailQueueService.sendEmail(
			EmailQueueService.ValidationEmail(user.toNecessaryUser(false), language, session, key)
		);
		handleServiceResponse(
			new ServiceResponse<string>(
				ResponseStatus.Success,
				'Recovery session created',
				session._id.toString(),
				StatusCodes.CREATED
			),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.BAD_REQUEST, 'Unable to create a recovery session', e, res);
	}
};
export const validateUserEmail = async (
	req: ERequest<null, any, ResponseI<PublicUserI>, OTPSessionSendI>,
	res: Response<ResponseI<PublicUserI>>
) => {
	const { sessionId, otpCode } = req.body;
	try {
		const user = await otpSessionModel.validateEmail(sessionId, otpCode);
		handleServiceResponse(
			new ServiceResponse<PublicUserI>(ResponseStatus.Success, 'Email validated', user, StatusCodes.OK),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.NOT_FOUND, "Couldn't validate email", e, res);
	}
};
