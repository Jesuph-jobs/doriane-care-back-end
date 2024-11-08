import type { Request, Response } from 'express';

import { FY_COOKIES_EXPIRE_IN } from '&server/env';

// import { isMobileRequest } from './Mobile';

export function clearToken(tokenName: string, res: Response) {
	res.cookie(tokenName, '', {
		sameSite: 'none',
		secure: true,
		httpOnly: true,
		expires: new Date(1),
	});
}
export function setToken(tokenName: string, token: string, res: Response, stay = false) {
	res.cookie(tokenName, token, {
		sameSite: 'none',
		secure: true,
		httpOnly: true,
		...(stay ? { expires: new Date(new Date().getTime() + FY_COOKIES_EXPIRE_IN) } : {}),
	});
}
export function extractAuth(tokenName: string, req: Request): string | undefined {
	/* 	const isMobileApp = isMobileRequest(req);
	if (isMobileApp) {
		const authHeader = req.headers['authorization'];
		if (authHeader && authHeader.startsWith('Bearer ')) return authHeader.slice(7);
	} else { */
	return req.cookies[tokenName];
	/* } */
}
