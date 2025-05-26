import type { Request } from 'express';
import type { ParsedQs } from 'qs';

import type { WebSettingsHydratedDocument } from '!common/generated/models/WebSite';
import type { UserHydratedDocument } from '!common/generated/models/user';

type RequestExtends = UserDocumentI | WebSiteDocumentI;

interface RequestExtendsMap<T extends RequestExtends | null = null> {
	records?: {
		user: T extends UserDocumentI ? UserHydratedDocument : null;
		website: T extends WebSiteDocumentI ? WebSettingsHydratedDocument : null;
	};
}

export interface ERequest<
	Req extends RequestExtends | null = null,
	// biome-ignore lint/complexity/noBannedTypes: fine for here
	Params = {},
	ResBody = any,
	ReqBody = any,
	// biome-ignore lint/complexity/noBannedTypes: fine for here
	ReqQuery = {},
	Locals extends Record<string, any> = Record<string, any>,
> extends Request<Params, ResBody, ReqBody, ReqQuery & ParsedQs, Locals>,
		RequestExtendsMap<Req> {}
