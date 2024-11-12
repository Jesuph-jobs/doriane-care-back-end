import { Router } from 'express';

import {
	OTPSessionRequestSchema,
	ResetPasswordRequestSchema,
	SendOTPSessionGetSchema,
	//SendOTPSessionSchema,
} from '^common/requests/otpSession';

import { createRecoveringSession, getOTPSession, resetPassword } from '@server/handlers/otpSession';
import { validateRequest } from '@server/utils/httpHandlers';

const recoverRouter = Router();
recoverRouter
	.route('/')
	.get(validateRequest(SendOTPSessionGetSchema()), getOTPSession)
	.post(validateRequest(OTPSessionRequestSchema()), createRecoveringSession);
// recoverRouter.route('/email').post(validateRequest(SendRecoverySessionSchema()), sendRecoverEmail);
// recoverRouter.route('/sms').post(sendSessionSMS);
recoverRouter.route('/reset').post(validateRequest(ResetPasswordRequestSchema()), resetPassword);

export default recoverRouter;
