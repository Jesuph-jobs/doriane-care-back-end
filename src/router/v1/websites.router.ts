import {
	getWebsiteById,
	getWebsites,
	updateHomeContent,
	updateLoyaltyProgram,
	updateWebsiteDeliverySettings,
	updateWebsiteFaq,
	updateWebsiteInformation,
	updateWebsiteIntegration,
	updateWebsiteNavigation,
	updateWebsitePolicies,
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
websitesRouter.route('/:websiteId/navigation').put(updateWebsiteNavigation);
websitesRouter.route('/:websiteId/policies').put(updateWebsitePolicies);
websitesRouter.route('/:websiteId/integration').put(updateWebsiteIntegration);
websitesRouter.route('/:websiteId/pages/home').put(updateHomeContent);
websitesRouter.route('/:websiteId/loyalty').put(updateLoyaltyProgram);
websitesRouter.route('/:websiteId/services').put(updateWebsiteServices);
websitesRouter.route('/:websiteId/testimonials').put(updateWebsiteTestimonials);
websitesRouter.route('/:websiteId/faq').put(updateWebsiteFaq);
websitesRouter.route('/:websiteId/delivery').put(updateWebsiteDeliverySettings);
websitesRouter.route('/:websiteId').get(getWebsiteById);

export default websitesRouter;
