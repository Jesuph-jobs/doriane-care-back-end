import type { Request } from 'express';
import type * as core from 'express-serve-static-core';
import type { ParsedQs } from 'qs';

import type { UserHydratedDocument } from '!server/models/user';

type RequestExtends = UserDocumentI;

interface RequestExtendsMap<T extends RequestExtends | null = null> {
	records?: { user: T extends UserDocumentI ? UserHydratedDocument : null };
}

export interface ERequest<
	Req extends RequestExtends | null = null,
	Params = core.ParamsDictionary,
	ResBody = any,
	ReqBody = any,
	ReqQuery = core.Query,
	Locals extends Record<string, any> = Record<string, any>,
> extends Request<Params, ResBody, ReqBody, ReqQuery & ParsedQs, Locals>,
		RequestExtendsMap<Req> {}
