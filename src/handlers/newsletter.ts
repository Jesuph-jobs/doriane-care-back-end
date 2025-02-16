import type { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { handleErrorResponse, handleServiceResponse } from '@server/utils/httpHandlers';
import { ResponseStatus, ServiceResponse } from '@server/utils/serviceResponse';

import type { ERequest } from '!server/E_Express';
import newsLetterModel from '&common/NewsLetter';
import { emailService } from '@server/services';

export const getNewsLetterSubscriptions = async (
	req: ERequest<WebSiteDocumentI, any, ResponseI<ListOf<PublicNewsLetterI>>>,
	res: Response<ResponseI<ListOf<PublicNewsLetterI>>>
) => {
	const website = req.records!.website!;
	try {
		const list = await newsLetterModel.find({ website: website._id }).lean();
		if (!list) throw new Error('newsletters not found');
		handleServiceResponse(
			new ServiceResponse<ListOf<PublicNewsLetterI>>(
				ResponseStatus.Success,
				'Newsletter fetched successfully',
				{ list: JSON.parse(JSON.stringify(list)), total: list.length },
				StatusCodes.OK
			),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't fetch newsletters", e, res);
	}
};
const emailsKeywords = ['#newsletter'];
export const sendPromotionEmail = async (
	req: ERequest<WebSiteDocumentI, any, ResponseI<null>, PromotionMailI>,
	res: Response<ResponseI<null>>
) => {
	const website = req.records!.website!;
	try {
		const { to, ...mailDetails } = req.body;
		const { emails, keywords } = to.reduce<{
			emails: string[];
			keywords: string[];
		}>(
			(acc, item) => {
				if (emailsKeywords.includes(item)) {
					acc.keywords.push(item);
				} else {
					acc.emails.push(item);
				}
				return acc;
			},
			{ emails: [], keywords: [] }
		);
		const list = [...emails];
		if (keywords.length > 0) {
			if (to.includes('#newsletter')) {
				const newsletters = await newsLetterModel.find({ website: website._id, subscribed: true }).lean();
				list.push(...newsletters.map(email => email.email));
			}
		}

		const response = await emailService.sendEmail({ to: list, ...mailDetails });
		if (!response) throw new Error('Email service error');
		if (response.accepted.length === 0) throw new Error('No emails has been accepted');
		if (response.rejected.length > 0)
			return handleServiceResponse(
				new ServiceResponse<null>(
					ResponseStatus.Success,
					'Emails has been sent partially',
					null,
					StatusCodes.OK
				),
				res
			);

		handleServiceResponse(
			new ServiceResponse<null>(
				ResponseStatus.Success,
				'Emails has been sent successfully',
				null,
				StatusCodes.OK
			),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't send emails", e, res);
	}
};
