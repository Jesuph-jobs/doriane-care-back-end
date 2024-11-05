import { Router } from "express";

import { OTPSessionRequestSchema, ValidateEmailSchema } from "^server/requests/otpSession";

import { resendValidation, validateUserEmail } from "@server/handlers/otpSession";
import { validateRequest } from "@server/utils/httpHandlers";

const validateRouter = Router();
validateRouter
	.route("/")
	.post(validateRequest(OTPSessionRequestSchema()), resendValidation)
	.put(validateRequest(ValidateEmailSchema()), validateUserEmail);

export default validateRouter;
