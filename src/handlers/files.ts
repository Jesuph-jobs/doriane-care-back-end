import type { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import multer from 'multer';

//import { cloudinaryService } from '@server/services';
import { handleErrorResponse, handleServiceResponse } from '@server/utils/httpHandlers';
import { ResponseStatus, ServiceResponse } from '@server/utils/serviceResponse';

import type { ERequest } from '!server/E_Express';

export const upload = multer({
	dest: 'uploads',
	limits: {
		fileSize: 1024 * 1024 * 5, // 5MB
	},
	storage: multer.diskStorage({
		destination: (_req, _file, cb) => {
			cb(null, 'uploads');
		},
	}),
}); /* cloudinaryService.cloudinaryStorage
	? multer({ storage: cloudinaryService.cloudinaryStorage })
	: null; */
export const UploadFile = (req: ERequest<null, any, ResponseI<MyFile>>, res: Response) => {
	try {
		if (!req.file) throw new Error("The file couldn't be uploaded");

		const serviceResponse = new ServiceResponse<MyFile>(
			ResponseStatus.Success,
			`File ${req.file.originalname} has been uploaded successfully`,
			req.file as unknown as MyFile,
			StatusCodes.OK
		);
		handleServiceResponse(serviceResponse, res);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "The file couldn't be uploaded", e, res);
	}
};
