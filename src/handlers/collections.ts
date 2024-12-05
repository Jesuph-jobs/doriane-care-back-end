import type { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { handleErrorResponse, handleServiceResponse } from '@server/utils/httpHandlers';
import { ResponseStatus, ServiceResponse, ServiceResponseList } from '@server/utils/serviceResponse';

import type { ERequest } from '!server/E_Express';
import { Types, isObjectIdOrHexString } from 'mongoose';
import collectionModel from '#common/Collection';

export const getCollectionById = async (
	req: ERequest<WebSiteDocumentI, { collectionId: string }, ResponseI<CollectionI>>,
	res: Response<ResponseI<CollectionI>>
) => {
	const collectionId = req.params.collectionId;
	const website = req.records!.website!;
	try {
		const collection = (await collectionModel
			.findOne({
				website: website._id,
				_id: collectionId,
			})
			.lean()) as CollectionI | null;
		if (!collection)
			return handleErrorResponse(
				StatusCodes.NOT_FOUND,
				'Collection not found',
				new Error('Collection not found'),
				res
			);
		handleServiceResponse(
			new ServiceResponse<CollectionI>(
				ResponseStatus.Success,
				'Collection fetched successfully',
				collection,
				StatusCodes.OK
			),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't fetch collection", e, res);
	}
};

export const getCollections = async (
	req: ERequest<
		WebSiteDocumentI,
		any,
		ResponseI<ListOf<CollectionTableDataI>>,
		any,
		SortableQuerySearchI<CollectionSortableFields>
	>,
	res: Response<ResponseI<ListOf<CollectionTableDataI>>>
) => {
	const website = req.records!.website!;
	try {
		const list = await collectionModel.getCollectionsTableDataI(req.query, website._id, {
			collectionType: req.query.collectionType === 'b' ? 'b' : 'p',
		});
		if (!list) throw new Error('Collections not found');
		handleServiceResponse(
			new ServiceResponseList<CollectionTableDataI>(
				ResponseStatus.Success,
				'Collections fetched successfully',
				list,
				StatusCodes.OK
			),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't fetch collections", e, res);
	}
};
export const getBasicCollections = async (
	req: ERequest<
		WebSiteDocumentI,
		any,
		ResponseI<BasicPublishableWithIdI[]>,
		any,
		{ forCollection: PublishableContentTypeI }
	>,
	res: Response<ResponseI<BasicPublishableWithIdI[]>>
) => {
	const website = req.records!.website!;
	try {
		console.log('req.query.forCollection', req.query.forCollection);
		const list = await collectionModel.find(
			{
				website: website._id,
				enabled: true,
				for: req.query.forCollection,
			},
			{
				_id: 1,
				name: 1,
			}
		);
		if (!list) throw new Error('Collections not found');
		handleServiceResponse(
			new ServiceResponse<BasicPublishableWithIdI[]>(
				ResponseStatus.Success,
				'Collections fetched successfully',
				list as BasicPublishableWithIdI[],
				StatusCodes.OK
			),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't fetch collections", e, res);
	}
};
export const getDraftCollections = async (
	req: ERequest<
		WebSiteDocumentI,
		any,
		ResponseI<ListOf<CollectionTableDataI>>,
		any,
		SortableQuerySearchI<CollectionSortableFields>
	>,
	res: Response<ResponseI<ListOf<CollectionTableDataI>>>
) => {
	const website = req.records!.website!;
	try {
		const list = await collectionModel.getCollectionsTableDataI(req.query, website._id, {
			collectionType: req.query.collectionType === 'b' ? 'b' : 'p',
			additionalFilter: {
				$or: [{ isPublished: { $exists: false } }, { isPublished: false }],
			},
		});
		if (!list) throw new Error('Collections not found');
		handleServiceResponse(
			new ServiceResponseList<CollectionTableDataI>(
				ResponseStatus.Success,
				'Collections fetched successfully',
				list,
				StatusCodes.OK
			),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't fetch collections", e, res);
	}
};
export const getDisabledCollections = async (
	req: ERequest<
		WebSiteDocumentI,
		any,
		ResponseI<ListOf<CollectionTableDataI>>,
		any,
		SortableQuerySearchI<CollectionSortableFields>
	>,
	res: Response<ResponseI<ListOf<CollectionTableDataI>>>
) => {
	const website = req.records!.website!;
	try {
		const list = await collectionModel.getCollectionsTableDataI(req.query, website._id, {
			collectionType: req.query.collectionType === 'b' ? 'b' : 'p',
			additionalFilter: {
				$or: [{ enabled: { $exists: false } }, { enabled: false }],
			},
		});
		if (!list) throw new Error('Collections not found');
		handleServiceResponse(
			new ServiceResponseList<CollectionTableDataI>(
				ResponseStatus.Success,
				'Collections fetched successfully',
				list,
				StatusCodes.OK
			),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't fetch collections", e, res);
	}
};
export const createCollection = async (
	req: ERequest<WebSiteDocumentI & UserDocumentI, any, ResponseI<PublicCollectionI>, CollectionInformationI>,
	res: Response<ResponseI<PublicCollectionI>>
) => {
	const website = req.records!.website!;
	try {
		const newCollection: CollectionI<Types.ObjectId> = {
			...req.body,
			website: website._id,
			avatar: {
				src: '',
				alt: '',
				height: 0,
				width: 0,
			},
			cover: {
				src: '',
				alt: '',
				height: 0,
				width: 0,
			},
			tags: [],
			isPublished: false,
			enabled: true,
			isPublic: true,
			publishables: [],
		};
		const collection = (await collectionModel.create(newCollection)).toOptimizedObject();
		handleServiceResponse(
			new ServiceResponse<OptimizedCollectionI>(
				ResponseStatus.Success,
				'Collection created successfully',
				collection,
				StatusCodes.CREATED
			),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't create collection", e, res);
	}
};

export const updateCollectionState = async (
	req: ERequest<WebSiteDocumentI, { collectionId: string }, ResponseI<null>, CollectionStateI>,
	res: Response<ResponseI<null>>
) => {
	const website = req.records!.website!;
	try {
		const collection = await collectionModel
			.updateOne(
				{
					website: website._id,
					_id: req.params.collectionId,
				},
				{
					$set: req.body,
				},
				{
					new: true,
				}
			)
			.lean();
		if (collection.modifiedCount === 0) throw new Error('Collection not found');
		handleServiceResponse(
			new ServiceResponse<null>(ResponseStatus.Success, 'Collection updated successfully', null, StatusCodes.OK),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't update collection", e, res);
	}
};
export const updateCollectionLabels = async (
	req: ERequest<WebSiteDocumentI, { collectionId: string }, ResponseI<null>, PublishableLabelsI<CollectionLabelsT>>,
	res: Response<ResponseI<null>>
) => {
	const website = req.records!.website!;
	console.log('label', req.body);
	try {
		const collection = await collectionModel
			.updateOne(
				{
					website: website._id,
					_id: req.params.collectionId,
				},
				{
					$set: {
						...(req.body.label ? { label: req.body.label, tags: req.body.tags } : { tags: req.body.tags }),
					},
					...(req.body.label
						? {}
						: {
								$unset: {
									label: '',
								},
							}),
				},
				{
					new: true,
				}
			)
			.lean();
		if (collection.modifiedCount === 0) throw new Error('Collection not found');
		handleServiceResponse(
			new ServiceResponse<null>(ResponseStatus.Success, 'Collection updated successfully', null, StatusCodes.OK),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't update collection", e, res);
	}
};
export const updateCollectionParentCollection = async (
	req: ERequest<WebSiteDocumentI, { collectionId: string }, ResponseI<null>, { parentCollectionId: string }>,
	res: Response<ResponseI<null>>
) => {
	const website = req.records!.website!;
	console.log('label', req.body);
	try {
		const collection = await collectionModel
			.updateOne(
				{
					website: website._id,
					_id: req.params.collectionId,
				},
				{
					...(req.body.parentCollectionId && isObjectIdOrHexString(req.body.parentCollectionId)
						? {
								$set: {
									parentCollection: new Types.ObjectId(req.body.parentCollectionId),
								},
							}
						: {
								$unset: {
									parentCollection: '',
								},
							}),
				},
				{
					new: true,
				}
			)
			.lean();
		if (collection.modifiedCount === 0) throw new Error('Collection not found');
		handleServiceResponse(
			new ServiceResponse<null>(ResponseStatus.Success, 'Collection updated successfully', null, StatusCodes.OK),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't update collection", e, res);
	}
};
export const updateCollectionImages = async (
	req: ERequest<WebSiteDocumentI, { collectionId: string }, ResponseI<null>, CollectionImagesI>,
	res: Response<ResponseI<null>>
) => {
	const website = req.records!.website!;
	try {
		const collection = await collectionModel
			.updateOne(
				{
					website: website._id,
					_id: req.params.collectionId,
				},
				{
					$set: {
						cover: req.body.cover,
						avatar: req.body.avatar,
					},
				},
				{
					new: true,
				}
			)
			.lean();
		if (collection.modifiedCount === 0) throw new Error('Collection not found');
		handleServiceResponse(
			new ServiceResponse<null>(ResponseStatus.Success, 'Collection updated successfully', null, StatusCodes.OK),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't update collection", e, res);
	}
};

export const updateCollectionInformation = async (
	req: ERequest<WebSiteDocumentI, { collectionId: string }, ResponseI<null>, CollectionInformationI>,
	res: Response<ResponseI<null>>
) => {
	const website = req.records!.website!;
	try {
		const collection = await collectionModel
			.updateOne(
				{
					website: website._id,
					_id: req.params.collectionId,
				},
				{
					$set: {
						name: req.body.name,
						for: req.body.for,
						summary: req.body.summary,
						slug: req.body.slug,
					},
				},
				{
					new: true,
				}
			)
			.lean();
		if (collection.modifiedCount === 0) throw new Error('Collection not found');
		handleServiceResponse(
			new ServiceResponse<null>(ResponseStatus.Success, 'Collection updated successfully', null, StatusCodes.OK),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't update collection", e, res);
	}
};

export const checkCollectionSlug = async (
	req: ERequest<WebSiteDocumentI, any, ResponseI<boolean>, any, { slug: string; collectionId?: string }>,
	res: Response<ResponseI<boolean>>
) => {
	const website = req.records!.website!;
	try {
		const collection = await collectionModel.exists({
			website: website._id,
			slug: req.query.slug,
			...(req.query.collectionId
				? {
						_id: {
							$ne: req.query.collectionId,
						},
					}
				: {}),
		});
		handleServiceResponse(
			new ServiceResponse<boolean>(
				ResponseStatus.Success,
				collection ? 'Slug already exists' : 'Slug is available',
				!!collection,
				StatusCodes.OK
			),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't check slug", e, res);
	}
};

export const deleteCollections = async (
	req: ERequest<WebSiteDocumentI, any, ResponseI<null>, { collectionIds: string[] }>,
	res: Response<ResponseI<null>>
) => {
	const website = req.records!.website!;
	try {
		const collections = await collectionModel.deleteMany({
			website: website._id,
			_id: {
				$in: req.body.collectionIds,
			},
		});
		if (collections.deletedCount === 0) throw new Error('Collections not found');
		if (collections.deletedCount !== req.body.collectionIds.length) throw new Error('Some collections not found');
		handleServiceResponse(
			new ServiceResponse<null>(ResponseStatus.Success, 'Collections deleted successfully', null, StatusCodes.OK),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't delete collections", e, res);
	}
};
