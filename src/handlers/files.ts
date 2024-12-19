import fs from 'node:fs';
import path from 'node:path';
import type { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import multer from 'multer';
import sharp from 'sharp';

//import { cloudinaryService } from '@server/services';
import { handleErrorResponse, handleServiceResponse } from '@server/utils/httpHandlers';
import { ResponseStatus, ServiceResponse } from '@server/utils/serviceResponse';

import type { ERequest } from '!server/E_Express';
import { FY_PUBLIC_DIR, FY_PUBLIC_FILES_DOMAIN } from '&server/env';
const imageDir = path.join(FY_PUBLIC_DIR, 'images');
if (!fs.existsSync(FY_PUBLIC_DIR)) {
	fs.mkdirSync(FY_PUBLIC_DIR);
}
if (!fs.existsSync(imageDir)) {
	fs.mkdirSync(imageDir);
}
export const uploadImageMulter = multer({
	dest: imageDir,
	limits: {
		fileSize: 1024 * 1024 * 5, // 5MB
	},
	fileFilter: (_req, file, cb) => {
		if (file.mimetype.startsWith('image/')) {
			cb(null, true);
		} else {
			cb(new Error('Only image files are allowed'));
		}
	},
	storage: multer.diskStorage({
		filename: (_req, file, cb) => {
			const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
			cb(null, `${uniqueSuffix}-${file.originalname.replaceAll(' ', '-')}`);
		},
		destination: (_req, _file, cb) => {
			cb(null, imageDir);
		},
	}),
});
/* cloudinaryService.cloudinaryStorage
	? multer({ storage: cloudinaryService.cloudinaryStorage })
	: null; */
export const UploadFile = async (req: ERequest<null, any, ResponseI<MyFile>>, res: Response) => {
	try {
		if (!req.file) throw new Error("The file couldn't be uploaded");
		const metadata = await sharp(req.file.path).metadata();

		const file: MyFile = {
			fileName: req.file.filename,
			src: new URL(`/images/${req.file.filename}`, FY_PUBLIC_FILES_DOMAIN).href,
			size: req.file.size,
			width: metadata.width || 0,
			height: metadata.height || 0,
		};

		const serviceResponse = new ServiceResponse<MyFile>(
			ResponseStatus.Success,
			`File ${req.file.originalname} has been uploaded successfully`,
			file,
			StatusCodes.OK
		);
		handleServiceResponse(serviceResponse, res);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "The file couldn't be uploaded", e, res);
	}
};
