import type { NextFunction, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { FY_TOKEN_NAME } from '&server/env';
import { Jwt } from '&server/jwt';
import { extractAuth } from '@server/utils/cookies';
import { handleServiceResponse } from '@server/utils/httpHandlers';
import { ResponseStatus, ServiceResponse } from '@server/utils/serviceResponse';

import type { ERequest } from '!server/E_Express';
import { websitesManagerService } from '@server/services';
import userModel from '#common/user';
async function loadLogs(req: ERequest<UserDocumentI | null>) {
	const token = extractAuth(FY_TOKEN_NAME, req);
	if (token) {
		try {
			const payload = Jwt.verify(token);
			req.records!.user = await userModel.getUserFromToken(payload);
		} catch (e) {
			const serviceResponse = new ServiceResponse<ErrorResponseI>(
				ResponseStatus.Failed,
				'Invalid Token',
				{ message: (e as Error).message as string, error: e as Error },
				StatusCodes.BAD_REQUEST
			);
			throw serviceResponse;
		}
	}
}
export const loadWebsite = async (req: ERequest<WebSiteDocumentI | null>) => {
	const websiteId = req.headers['website-id'];
	if (websiteId) {
		const website = websitesManagerService.getWebsite(Array.isArray(websiteId) ? websiteId[0] : websiteId);
		/* 	throw new ServiceResponse<null>(
			ResponseStatus.Failed,
			'Website header not found',
			null,
			StatusCodes.BAD_REQUEST
		); */
		if (website) req.records!.website = website;
	}
};

export const checkLogs = async (req: ERequest<UserDocumentI | null>, res: Response, next: NextFunction) => {
	try {
		await loadLogs(req);
	} catch (e) {
		return handleServiceResponse(e as ServiceResponse<ErrorResponseI>, res);
	}
	return next();
};
export const checkWebsite = async (req: ERequest<WebSiteDocumentI | null>, res: Response, next: NextFunction) => {
	try {
		await loadWebsite(req);
	} catch (e) {
		return handleServiceResponse(e as ServiceResponse<null>, res);
	}
	return next();
};

export const checkConfiguration = async (
	req: ERequest<WebSiteDocumentI | UserDocumentI | null>,
	res: Response,
	next: NextFunction
) => {
	const configurationsPromises = [loadWebsite(req).catch(e => e), loadLogs(req).catch(e => e)];
	const errors = await Promise.all(configurationsPromises);
	if (errors.some(e => e && e instanceof ServiceResponse)) {
		return handleServiceResponse(
			errors.find(e => e instanceof ServiceResponse) as ServiceResponse<ErrorResponseI>,
			res
		);
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

export const isLoggedInAndWebsite = (
	req: ERequest<UserDocumentI | WebSiteDocumentI | null>,
	res: Response,
	next: NextFunction
) => {
	if (req.records!.user && req.records!.website) {
		const user = req.records!.user.toPublicUser();
		const website = req.records!.website;
		const userHasWebsite = user.websitesPermissions.some(w => w.website && website._id.equals(w.website?._id));
		if (userHasWebsite) return next();
	}
	const serviceResponse = new ServiceResponse<null>(
		ResponseStatus.Failed,
		"You aren't well configured, make sure that u are logged in and have a website ",
		null,
		StatusCodes.UNAUTHORIZED
	);
	return handleServiceResponse(serviceResponse, res);
};
