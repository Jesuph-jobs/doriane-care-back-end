import type { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { FY_TOKEN_NAME } from '&server/env';
// import { emailQueueService } from '@server/services';
// import EmailQueueService from '@server/services/Email';
import { clearToken, setToken } from '@server/utils/cookies';
import { handleErrorResponse, handleServiceResponse } from '@server/utils/httpHandlers';
import { ResponseStatus, ServiceResponse } from '@server/utils/serviceResponse';

import type { UserHydratedDocument } from '!common/generated/models/user';
import type { ERequest } from '!server/E_Express';
import userModel from '#common/user';

export const CheckAuth = async (req: ERequest<UserDocumentI, any, ResponseI<UserAuthI>>, res: Response) => {
	const user = req.records!.user as UserHydratedDocument;
	const serviceResponse = new ServiceResponse<UserAuthI>(
		ResponseStatus.Success,
		'Welcome back!',
		{ user: user.toPublicUser() },
		StatusCodes.OK
	);
	handleServiceResponse(serviceResponse, res);
};

export const Logout = async (_req: ERequest<UserDocumentI>, res: Response) => {
	clearToken(FY_TOKEN_NAME, res);
	handleServiceResponse(
		new ServiceResponse<null>(ResponseStatus.Success, 'You have been logged out', null, StatusCodes.OK),
		res
	);
};

export const Login = async (
	req: ERequest<null, any, ResponseI<UserAuthI>, UserLogInI>,
	res: Response<ResponseI<UserAuthI>>
) => {
	const loginData = req.body;
	try {
		const user = await userModel.findByCredentials(loginData.email, loginData.password);
		const token = await user.generateAuthToken();
		setToken(FY_TOKEN_NAME, token, res, loginData.stay);

		handleServiceResponse(
			new ServiceResponse<UserAuthI>(
				ResponseStatus.Success,
				'You have been logged in',
				{
					user: user.toPublicUser(),
					new: !user.lastLogin,
				},
				StatusCodes.OK
			),
			res
		);
	} catch (e) {
		handleServiceResponse(
			new ServiceResponse<ErrorResponseI>(
				ResponseStatus.Failed,
				'Invalid credentials',
				{ message: (e as Error).message, error: e as Error },
				StatusCodes.BAD_REQUEST
			),
			res
		);
	}
};

/* export const Register = async (
	req: ERequest<null, any, ResponseI<UserAuthI>, UserRegistrationI>,
	res: Response<ResponseI<UserAuthI>>
) => {
	const userData = req.body;
	const userBody: UserI = {
		email: userData.email,
		password: userData.password,
		personalInformation: userData.personalInformation,
		phone: userData.phone,
		profilePicture: userData.profilePicture,
	};

	try {
		const user = await userModel.createUser(userBody);
		const token = await user.generateAuthToken();
		setToken(FY_TOKEN_NAME, token, res);

		handleServiceResponse(
			new ServiceResponse<UserAuthI>(
				ResponseStatus.Success,
				'You have been registered',
				{
					user: await user.toPublicUser(),
					new: true,
					token: token,
				},
				StatusCodes.CREATED
			),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.BAD_REQUEST, 'User could not be registered', e, res);
	}
}; */
export const checkUsername = async (req: ERequest<null, { username: string }, ResponseI<boolean>>, res: Response) => {
	const { username } = req.params;
	try {
		const user = await userModel.exists({ username });
		const isAvailable = !user;
		const serviceResponse = new ServiceResponse<boolean>(
			ResponseStatus.Success,
			isAvailable ? 'Username is available' : 'Username is not available',
			isAvailable,
			StatusCodes.OK
		);
		handleServiceResponse(serviceResponse, res);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, 'Username could not be checked', e, res);
	}
};
export const checkEmail = async (req: ERequest<null, { email: string }, ResponseI<boolean>>, res: Response) => {
	const { email } = req.params;
	try {
		const user = await userModel.exists({ email });
		const isAvailable = !user;
		const serviceResponse = new ServiceResponse<boolean>(
			ResponseStatus.Success,
			isAvailable ? 'Email is available' : 'Email is not available',
			isAvailable,
			StatusCodes.OK
		);
		handleServiceResponse(serviceResponse, res);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, 'Email could not be checked', e, res);
	}
};

/* export const validateUserAuth = async (
	req: ERequest<UserDocumentI, any, ResponseI<null>, ValidateRequestI>,
	res: Response
) => {
	const user = req.records!.user;
	const { path, key } = req.body;
	try {
		await user.validateUser(key, path);
		handleServiceResponse(
			new ServiceResponse<null>(
				ResponseStatus.Success,
				`User's ${path} validated successfully`,
				null,
				StatusCodes.OK
			),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, `User's ${path} couldn't be validated`, e, res);
	}
}; */

/* export const resendValidation = async (
	req: ERequest<UserDocumentI, any, ResponseI<null>, ValidationResendRequestI>,
	res: Response
) => {
	const user = req.records!.user;
	const { path } = req.body;
	try {
		await sendValidationEmail(user, req, path);
		handleServiceResponse(
			new ServiceResponse<null>(ResponseStatus.Success, 'Validation resent successfully', null, StatusCodes.OK),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, 'Validation could not be resent', e, res);
	}
}; */
