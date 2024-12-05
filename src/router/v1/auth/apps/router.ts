/* import { Router } from 'express';

import { GoogleLoginRequestShapeSchema, RequestGoogleUrlShapeSchema } from '^common/requests/auth';

import {
	getUserApps,
	googleAuthorizationUrl,
	googleLinkUrl,
	linkToGoogle,
	loginWithGoogle,
	unlinkGoogle,
} from '@server/handlers/auth.google.handler';
import { checkLogs, isLoggedIn } from '@server/middleware/auth';
import { validateRequest } from '@server/utils/httpHandlers';

const appsRouter = Router();

appsRouter.route('/').get(checkLogs, isLoggedIn, getUserApps);
appsRouter
	.route('/google')
	// request google url redirect link
	.get(validateRequest(RequestGoogleUrlShapeSchema), googleAuthorizationUrl)
	// login with google
	.post(validateRequest(GoogleLoginRequestShapeSchema), loginWithGoogle);
appsRouter
	.route('/link/google')
	.all(checkLogs, isLoggedIn)
	// request google url redirect link
	.get(validateRequest(RequestGoogleUrlShapeSchema), googleLinkUrl)
	// login with google
	.post(validateRequest(GoogleLoginRequestShapeSchema), linkToGoogle)
	.delete(unlinkGoogle);

export default appsRouter;
 */
