import type { ErrorRequestHandler, RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";

import { handleServiceResponse } from "@server/utils/httpHandlers";
import { ResponseStatus, ServiceResponse } from "@server/utils/serviceResponse";

export const unexpectedRequest: RequestHandler = (_req, res) => {
	const serviceResponse = new ServiceResponse(ResponseStatus.Failed, "Not Found", null, StatusCodes.NOT_FOUND);
	handleServiceResponse(serviceResponse, res);
};

export const defaultErrorRequestHandler: ErrorRequestHandler = (err, _req, res) => {
	handleServiceResponse(
		new ServiceResponse(ResponseStatus.Failed, err.message, null, StatusCodes.INTERNAL_SERVER_ERROR),
		res,
	);
};

export default function errorHandler() {
	return [unexpectedRequest, defaultErrorRequestHandler];
}
