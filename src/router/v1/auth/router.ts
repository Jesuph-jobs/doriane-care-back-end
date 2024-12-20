import { Router } from 'express';

import {
	CheckAuthShapeSchema,
	CheckEmailShapeSchema,
	CheckUsernameShapeSchema,
	LoginRequestShapeSchema,
	/* RegisterRequestShapeSchema, */
} from '^server/requests/auth';

import { CheckAuth, Login, Logout, /* Register, */ checkEmail, checkUsername } from '@server/handlers/auth';
import { checkLogs, isLoggedIn } from '@server/middleware/auth';
import { validateRequest } from '@server/utils/httpHandlers';

//import appsRouter from './apps/router';
import recoverRouter from './recover/router';
import validateRouter from './validate/router';

const router = Router();
// check user is logged in
router.get('/', validateRequest(CheckAuthShapeSchema), checkLogs, isLoggedIn, CheckAuth);

// logout

router.delete('/', checkLogs, isLoggedIn, Logout);

// login
router.post('/login', validateRequest(LoginRequestShapeSchema), Login);

// register
/* router.post(
	'/register',

	validateRequest(RegisterRequestShapeSchema),
	Register
); */

// check if username is available
router.get('/username/:username', validateRequest(CheckUsernameShapeSchema), checkUsername);

// check if email is available
router.get('/email/:email', validateRequest(CheckEmailShapeSchema), checkEmail);

// validate user email or phone
router.use('/validate', checkLogs, isLoggedIn, validateRouter);

// add recover router
router.use('/recover', recoverRouter);

// apps auth (google, facebook, etc)
//router.use('/apps', appsRouter);

export default router;
