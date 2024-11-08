import type { Request } from 'express';

import { FY_MOBILE_AGENT } from '&server/env';

const MobileRegex = new RegExp(FY_MOBILE_AGENT, 'i');
export function isMobileRequest(req: Request) {
	return MobileRegex.test(req.headers['user-agent'] || '');
}
