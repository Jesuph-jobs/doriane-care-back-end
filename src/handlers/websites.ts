import type { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { handleErrorResponse, handleServiceResponse } from '@server/utils/httpHandlers';
import { ResponseStatus, ServiceResponse, ServiceResponseList } from '@server/utils/serviceResponse';

import type { ERequest } from '!server/E_Express';
import { websitesManagerService } from '@server/services';
import type { Types } from 'mongoose';

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
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't fetch products", e, res);
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
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't fetch order", e, res);
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
