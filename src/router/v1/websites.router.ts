import {
	getWebsiteById,
	getWebsites,
	updateWebsiteFaq,
	updateWebsiteInformation,
	updateWebsiteServices,
	updateWebsiteState,
	updateWebsiteTestimonials,
} from '@server/handlers/websites';
import { Router } from 'express';
// import { validateRequest } from '@server/utils/httpHandlers';

const websitesRouter = Router();

websitesRouter.route('/').get(getWebsites);
websitesRouter.route('/:websiteId/state').put(updateWebsiteState);
websitesRouter.route('/:websiteId/information').put(updateWebsiteInformation);
websitesRouter.route('/:websiteId/services').put(updateWebsiteServices);
websitesRouter.route('/:websiteId/testimonials').put(updateWebsiteTestimonials);
websitesRouter.route('/:websiteId/faq').put(updateWebsiteFaq);
websitesRouter.route('/:websiteId').get(getWebsiteById);

export default websitesRouter;
