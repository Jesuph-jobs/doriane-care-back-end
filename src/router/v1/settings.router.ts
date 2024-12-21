import { Router } from 'express';

import { getWebsiteSettings } from '@server/handlers/settings';
// import { validateRequest } from '@server/utils/httpHandlers';

const settingsRouter = Router();

settingsRouter.route('/').get(getWebsiteSettings);

export default settingsRouter;
