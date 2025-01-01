import type { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { handleErrorResponse, handleServiceResponse } from '@server/utils/httpHandlers';
import { ResponseStatus, ServiceResponse, ServiceResponseList } from '@server/utils/serviceResponse';

import type { ERequest } from '!server/E_Express';
import { websitesManagerService } from '@server/services';
import { Types } from 'mongoose';

export const getWebsites = async (
	req: ERequest<
		null,
		any,
		ResponseI<ListOf<PublicWebSiteI<Types.ObjectId>>>,
		any,
		SortableQuerySearchI<WebSiteSortableFields> & { enabled?: boolean }
	>,
	res: Response<ResponseI<ListOf<PublicWebSiteI<Types.ObjectId>>>>
) => {
	try {
		const list = await websitesManagerService.getWebsitesList(req.query);
		handleServiceResponse(
			new ServiceResponseList<PublicWebSiteI<Types.ObjectId>>(
				ResponseStatus.Success,
				'Websites fetched successfully',
				list,
				StatusCodes.OK
			),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't fetch website settings", e, res);
	}
};
export const getWebsiteById = async (
	req: ERequest<WebSiteDocumentI, { websiteId: string }, ResponseI<PublicWebSiteI<Types.ObjectId>>>,
	res: Response<ResponseI<PublicWebSiteI<Types.ObjectId>>>
) => {
	try {
		const website = websitesManagerService.getWebsite(req.params.websiteId);
		if (!website) throw new Error('Website not found');
		handleServiceResponse(
			new ServiceResponse<PublicWebSiteI<Types.ObjectId>>(
				ResponseStatus.Success,
				`Website ${website.FY_ID} Website fetched successfully`,
				website.toOptimizedObject(),
				StatusCodes.OK
			),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't fetch website settings", e, res);
	}
};

export const updateWebsiteState = async (
	req: ERequest<null, { websiteId: string }, ResponseI<null>, Pick<PublishableStatesI, 'enabled'>>,
	res: Response<ResponseI<null>>
) => {
	try {
		const website = websitesManagerService.getWebsite(req.params.websiteId);
		if (!website) throw new Error('Website not found');
		website.enabled = req.body.enabled;
		await website.save();
		handleServiceResponse(
			new ServiceResponse<null>(ResponseStatus.Success, 'Website updated successfully', null, StatusCodes.OK),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't update website", e, res);
	}
};
export const updateWebsiteInformation = async (
	req: ERequest<null, { websiteId: string }, ResponseI<null>, WebsiteInformationI>,
	res: Response<ResponseI<null>>
) => {
	try {
		const website = websitesManagerService.getWebsite(req.params.websiteId);
		if (!website) throw new Error('Website not found');
		website.websiteInformation = req.body;
		await website.save();
		handleServiceResponse(
			new ServiceResponse<null>(ResponseStatus.Success, 'Website updated successfully', null, StatusCodes.OK),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't update website", e, res);
	}
};
export const updateWebsiteNavigation = async (
	req: ERequest<null, { websiteId: string }, ResponseI<null>, NavigationSettingsI>,
	res: Response<ResponseI<null>>
) => {
	try {
		const website = websitesManagerService.getWebsite(req.params.websiteId);
		if (!website) throw new Error('Website not found');
		website.navigations = req.body.navigations;
		website.links = req.body.links;
		await website.save();
		handleServiceResponse(
			new ServiceResponse<null>(ResponseStatus.Success, 'Website updated successfully', null, StatusCodes.OK),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't update website", e, res);
	}
};
export const updateWebsitePolicies = async (
	req: ERequest<null, { websiteId: string }, ResponseI<null>, WebsitePoliciesI>,
	res: Response<ResponseI<null>>
) => {
	try {
		const website = websitesManagerService.getWebsite(req.params.websiteId);
		if (!website) throw new Error('Website not found');
		website.policies = req.body;
		await website.save();
		handleServiceResponse(
			new ServiceResponse<null>(ResponseStatus.Success, 'Website updated successfully', null, StatusCodes.OK),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't update website", e, res);
	}
};
export const updateWebsiteIntegration = async (
	req: ERequest<null, { websiteId: string }, ResponseI<null>, AnalyticsIntegrationI>,
	res: Response<ResponseI<null>>
) => {
	try {
		const website = websitesManagerService.getWebsite(req.params.websiteId);
		if (!website) throw new Error('Website not found');
		website.integrations = req.body;
		await website.save();
		handleServiceResponse(
			new ServiceResponse<null>(ResponseStatus.Success, 'Website updated successfully', null, StatusCodes.OK),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't update website", e, res);
	}
};
export const updateHomeContent = async (
	req: ERequest<null, { websiteId: string }, ResponseI<null>, PageContentI>,
	res: Response<ResponseI<null>>
) => {
	try {
		const website = websitesManagerService.getWebsite(req.params.websiteId);
		if (!website) throw new Error('Website not found');
		const pageContentWithoutT = req.body;
		const pageContent: PageContentI<Types.ObjectId, Types.ObjectId> = {
			blogs: {
				categories: pageContentWithoutT.blogs.categories.map(category => new Types.ObjectId(category)),
				collections: pageContentWithoutT.blogs.collections.map(collections => new Types.ObjectId(collections)),
			},
			products: {
				categories: pageContentWithoutT.products.categories.map(category => new Types.ObjectId(category)),
				collections: pageContentWithoutT.products.collections.map(
					collections => new Types.ObjectId(collections)
				),
			},
		};
		if (!website.pagesContent) website.pagesContent = { home: pageContent };
		else website.pagesContent.home = pageContent;
		await website.save();
		handleServiceResponse(
			new ServiceResponse<null>(ResponseStatus.Success, 'Website updated successfully', null, StatusCodes.OK),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't update website", e, res);
	}
};
// content settings
export const updateWebsiteServices = async (
	req: ERequest<null, { websiteId: string }, ResponseI<null>, ServicesSettingsFromI>,
	res: Response<ResponseI<null>>
) => {
	try {
		const website = websitesManagerService.getWebsite(req.params.websiteId);
		if (!website) throw new Error('Website not found');
		website.services = req.body.services;
		await website.save();
		handleServiceResponse(
			new ServiceResponse<null>(ResponseStatus.Success, 'Website updated successfully', null, StatusCodes.OK),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't update website", e, res);
	}
};
export const updateWebsiteTestimonials = async (
	req: ERequest<null, { websiteId: string }, ResponseI<null>, TestimonialsSettingsFromI>,
	res: Response<ResponseI<null>>
) => {
	try {
		const website = websitesManagerService.getWebsite(req.params.websiteId);
		if (!website) throw new Error('Website not found');
		website.testimonials = req.body.testimonials;
		await website.save();
		handleServiceResponse(
			new ServiceResponse<null>(ResponseStatus.Success, 'Website updated successfully', null, StatusCodes.OK),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't update website", e, res);
	}
};
export const updateWebsiteFaq = async (
	req: ERequest<null, { websiteId: string }, ResponseI<null>, FAQSettingsFromI>,
	res: Response<ResponseI<null>>
) => {
	try {
		const website = websitesManagerService.getWebsite(req.params.websiteId);
		if (!website) throw new Error('Website not found');
		website.faqs = req.body.faqs;
		await website.save();
		handleServiceResponse(
			new ServiceResponse<null>(ResponseStatus.Success, 'Website updated successfully', null, StatusCodes.OK),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't update website", e, res);
	}
};
