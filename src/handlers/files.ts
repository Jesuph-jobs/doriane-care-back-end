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
const otherFilesDir = path.join(FY_PUBLIC_DIR, 'other');
if (!fs.existsSync(FY_PUBLIC_DIR)) {
	fs.mkdirSync(FY_PUBLIC_DIR);
}
if (!fs.existsSync(imageDir)) {
	fs.mkdirSync(imageDir);
}
if (!fs.existsSync(otherFilesDir)) {
	fs.mkdirSync(otherFilesDir);
}
/* cloudinaryService.cloudinaryStorage
	? multer({ storage: cloudinaryService.cloudinaryStorage })
	: null; */
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

export const UploadImageFile = async (req: ERequest<null, any, ResponseI<MyImageFile>>, res: Response) => {
	try {
		if (!req.file) throw new Error("The file couldn't be uploaded");
		const metadata = await sharp(req.file.path).metadata();

		const file: MyImageFile = {
			fileName: req.file.filename,
			src: new URL(`/images/${req.file.filename}`, FY_PUBLIC_FILES_DOMAIN).href,
			size: req.file.size,
			width: metadata.width || 0,
			mimetype: req.file.mimetype,
			height: metadata.height || 0,
		};

		const serviceResponse = new ServiceResponse<MyImageFile>(
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
export const uploadOtherMulter = multer({
	dest: otherFilesDir,
	limits: {
		fileSize: 1024 * 1024 * 8, // 8MB
	},
	fileFilter: (_req, file, cb) => {
		if (file.mimetype === 'application/pdf') {
			cb(null, true);
		} else {
			cb(new Error('Only pdf files are allowed currently'));
		}
	},
	storage: multer.diskStorage({
		filename: (_req, file, cb) => {
			const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
			cb(null, `${uniqueSuffix}-${file.originalname.replaceAll(' ', '-')}`);
		},
		destination: (_req, _file, cb) => {
			cb(null, otherFilesDir);
		},
	}),
});

export const UploadOtherFile = async (req: ERequest<null, any, ResponseI<MyFile>>, res: Response) => {
	try {
		if (!req.file) throw new Error("The file couldn't be uploaded");

		const file: MyFile = {
			fileName: req.file.filename,
			src: new URL(`/other/${req.file.filename}`, FY_PUBLIC_FILES_DOMAIN).href,
			size: req.file.size,
			mimetype: req.file.mimetype,
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
