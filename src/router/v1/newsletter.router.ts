import { Router } from 'express';

import { getNewsLetterSubscriptions } from '@server/handlers/newsletter';
// import { validateRequest } from '@server/utils/httpHandlers';

const newsletterRouter = Router();

newsletterRouter.route('/').get(getNewsLetterSubscriptions);

export default newsletterRouter;
