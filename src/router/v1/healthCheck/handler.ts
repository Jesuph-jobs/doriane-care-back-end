import type { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { handleServiceResponse } from '@server/utils/httpHandlers';
import { ResponseStatus, ServiceResponse } from '@server/utils/serviceResponse';

export function healthCheck(_req: Request, res: Response) {
	const serviceResponse = new ServiceResponse(ResponseStatus.Success, 'Service is healthy', null, StatusCodes.OK);

	handleServiceResponse(serviceResponse, res);
}
