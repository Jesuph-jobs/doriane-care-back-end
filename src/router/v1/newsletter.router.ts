import { Router } from 'express';

import { getNewsLetterSubscriptions, sendPromotionEmail } from '@server/handlers/newsletter';
// import { validateRequest } from '@server/utils/httpHandlers';

const newsletterRouter = Router();

newsletterRouter.route('/').get(getNewsLetterSubscriptions).post(sendPromotionEmail);

export default newsletterRouter;
