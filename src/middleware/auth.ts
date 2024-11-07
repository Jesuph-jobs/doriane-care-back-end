import type { NextFunction, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { APP_TOKEN_NAME } from '&server/env';
import { Jwt } from '&server/jwt';
import { clearToken, extractAuth } from '@server/utils/cookies';
import { handleServiceResponse } from '@server/utils/httpHandlers';
import { ResponseStatus, ServiceResponse } from '@server/utils/serviceResponse';

import type { ERequest } from '!server/E_Express';
import userModel from '#server/user';

export const checkLogs = async (req: ERequest<UserDocumentI | null>, res: Response, next: NextFunction) => {
	const token = extractAuth(APP_TOKEN_NAME, req);
	if (token) {
		try {
			const payload = Jwt.verify(token);
			req.records!.user = await userModel.getUserFromToken(payload);
		} catch (e) {
			clearToken(APP_TOKEN_NAME, res);
			const serviceResponse = new ServiceResponse<ErrorResponseI>(
				ResponseStatus.Failed,
				'Invalid Token',
				{ message: (e as Error).message as string, error: e as Error },
				StatusCodes.BAD_REQUEST
			);
			return handleServiceResponse(serviceResponse, res);
		}
	}

	return next();
};

export const isLoggedIn = (req: ERequest<UserDocumentI | null>, res: Response, next: NextFunction) => {
	if (req.records!.user) return next();
	const serviceResponse = new ServiceResponse<null>(
		ResponseStatus.Failed,
		"You aren't logged in",
		null,
		StatusCodes.UNAUTHORIZED
	);
	return handleServiceResponse(serviceResponse, res);
};
