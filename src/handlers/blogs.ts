import type { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { handleErrorResponse, handleServiceResponse } from '@server/utils/httpHandlers';
import { ResponseStatus, ServiceResponse, ServiceResponseList } from '@server/utils/serviceResponse';

import type { ERequest } from '!server/E_Express';
import { Types, isObjectIdOrHexString } from 'mongoose';
import blogModel from '#common/Blog';
import reviewModel from '#common/Review';

export const getBlogById = async (
	req: ERequest<WebSiteDocumentI, { blogId: string }, ResponseI<BlogI>>,
	res: Response<ResponseI<BlogI>>
) => {
	const blogId = req.params.blogId;
	const website = req.records!.website!;
	try {
		const blog = (await blogModel
			.findOne({
				website: website._id,
				_id: blogId,
			})
			.lean()) as BlogI | null;
		if (!blog)
			return handleErrorResponse(StatusCodes.NOT_FOUND, 'Blog not found', new Error('Blog not found'), res);
		handleServiceResponse(
			new ServiceResponse<BlogI>(ResponseStatus.Success, 'Blog fetched successfully', blog, StatusCodes.OK),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't fetch blog", e, res);
	}
};

export const getBlogs = async (
	req: ERequest<
		WebSiteDocumentI,
		any,
		ResponseI<ListOf<BlogTableDataI>>,
		any,
		SortableQuerySearchI<BlogSortableFields>
	>,
	res: Response<ResponseI<ListOf<BlogTableDataI>>>
) => {
	const website = req.records!.website!;
	try {
		const list = await blogModel.getBlogTableDataI(req.query, website._id);
		if (!list) throw new Error('Blogs not found');
		handleServiceResponse(
			new ServiceResponseList<BlogTableDataI>(
				ResponseStatus.Success,
				'Blogs fetched successfully',
				list,
				StatusCodes.OK
			),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't fetch blogs", e, res);
	}
};
export const getDraftBlogs = async (
	req: ERequest<
		WebSiteDocumentI,
		any,
		ResponseI<ListOf<BlogTableDataI>>,
		any,
		SortableQuerySearchI<BlogSortableFields>
	>,
	res: Response<ResponseI<ListOf<BlogTableDataI>>>
) => {
	const website = req.records!.website!;
	try {
		const list = await blogModel.getBlogTableDataI(req.query, website._id, {
			$or: [{ isPublished: { $exists: false } }, { isPublished: false }],
		});
		if (!list) throw new Error('Blogs not found');
		handleServiceResponse(
			new ServiceResponseList<BlogTableDataI>(
				ResponseStatus.Success,
				'Blogs fetched successfully',
				list,
				StatusCodes.OK
			),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't fetch blogs", e, res);
	}
};
export const getDisabledBlogs = async (
	req: ERequest<
		WebSiteDocumentI,
		any,
		ResponseI<ListOf<BlogTableDataI>>,
		any,
		SortableQuerySearchI<BlogSortableFields>
	>,
	res: Response<ResponseI<ListOf<BlogTableDataI>>>
) => {
	const website = req.records!.website!;
	try {
		const list = await blogModel.getBlogTableDataI(req.query, website._id, {
			$or: [{ enabled: { $exists: false } }, { enabled: false }],
		});
		if (!list) throw new Error('Blogs not found');
		handleServiceResponse(
			new ServiceResponseList<BlogTableDataI>(
				ResponseStatus.Success,
				'Blogs fetched successfully',
				list,
				StatusCodes.OK
			),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't fetch blogs", e, res);
	}
};
export const createBlog = async (
	req: ERequest<WebSiteDocumentI & UserDocumentI, any, ResponseI<PublicBlogI>, BlogInformationI>,
	res: Response<ResponseI<PublicBlogI>>
) => {
	const website = req.records!.website!;
	const user = req.records!.user!;
	try {
		const newBlog: CreateBlogI<Types.ObjectId> = {
			...req.body,
			website: website._id,
			thumbnail: {
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
			author: user.personalInformation,

			createdBy: user._id,
		};
		const blog = (await blogModel.create(newBlog)).toOptimizedObject();
		handleServiceResponse(
			new ServiceResponse<PublicBlogI>(
				ResponseStatus.Success,
				'Blog created successfully',
				blog,
				StatusCodes.CREATED
			),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't create blog", e, res);
	}
};

export const updateBlogState = async (
	req: ERequest<WebSiteDocumentI, { blogId: string }, ResponseI<null>, PublishableStateI>,
	res: Response<ResponseI<null>>
) => {
	const website = req.records!.website!;
	try {
		const blog = await blogModel
			.updateOne(
				{
					website: website._id,
					_id: req.params.blogId,
				},
				{
					$set: req.body,
				},
				{
					new: true,
				}
			)
			.lean();
		if (blog.modifiedCount === 0) throw new Error('Blog not found');
		handleServiceResponse(
			new ServiceResponse<null>(ResponseStatus.Success, 'Blog updated successfully', null, StatusCodes.OK),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't update blog", e, res);
	}
};
export const updateBlogLabels = async (
	req: ERequest<WebSiteDocumentI, { blogId: string }, ResponseI<null>, PublishableLabelsI<BlogsLabelsT>>,
	res: Response<ResponseI<null>>
) => {
	const website = req.records!.website!;
	console.log('label', req.body);
	try {
		const blog = await blogModel
			.updateOne(
				{
					website: website._id,
					_id: req.params.blogId,
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
		if (blog.modifiedCount === 0) throw new Error('Blog not found');
		handleServiceResponse(
			new ServiceResponse<null>(ResponseStatus.Success, 'Blog updated successfully', null, StatusCodes.OK),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't update blog", e, res);
	}
};
export const updateBlogCategory = async (
	req: ERequest<WebSiteDocumentI, { blogId: string }, ResponseI<null>, { categoryId: string }>,
	res: Response<ResponseI<null>>
) => {
	const website = req.records!.website!;
	console.log('label', req.body);
	try {
		const blog = await blogModel
			.updateOne(
				{
					website: website._id,
					_id: req.params.blogId,
				},
				{
					...(req.body.categoryId && isObjectIdOrHexString(req.body.categoryId)
						? {
								$set: {
									category: new Types.ObjectId(req.body.categoryId),
								},
							}
						: {
								$unset: {
									category: '',
								},
							}),
				},
				{
					new: true,
				}
			)
			.lean();
		if (blog.modifiedCount === 0) throw new Error('Blog not found');
		handleServiceResponse(
			new ServiceResponse<null>(ResponseStatus.Success, 'Blog updated successfully', null, StatusCodes.OK),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't update blog", e, res);
	}
};
export const updateBlogImages = async (
	req: ERequest<WebSiteDocumentI, { blogId: string }, ResponseI<null>, BlogImagesI>,
	res: Response<ResponseI<null>>
) => {
	const website = req.records!.website!;
	try {
		const blog = await blogModel
			.updateOne(
				{
					website: website._id,
					_id: req.params.blogId,
				},
				{
					$set: {
						cover: req.body.cover,
						thumbnail: req.body.thumbnail,
					},
				},
				{
					new: true,
				}
			)
			.lean();
		if (blog.modifiedCount === 0) throw new Error('Blog not found');
		handleServiceResponse(
			new ServiceResponse<null>(ResponseStatus.Success, 'Blog updated successfully', null, StatusCodes.OK),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't update blog", e, res);
	}
};

export const updateBlogInformation = async (
	req: ERequest<WebSiteDocumentI, { blogId: string }, ResponseI<null>, BlogInformationI>,
	res: Response<ResponseI<null>>
) => {
	const website = req.records!.website!;
	try {
		const blog = await blogModel
			.updateOne(
				{
					website: website._id,
					_id: req.params.blogId,
				},
				{
					$set: {
						name: req.body.name,
						content: req.body.content,
						summary: req.body.summary,
						slug: req.body.slug,
					},
				},
				{
					new: true,
				}
			)
			.lean();
		if (blog.modifiedCount === 0) throw new Error('Blog not found');
		handleServiceResponse(
			new ServiceResponse<null>(ResponseStatus.Success, 'Blog updated successfully', null, StatusCodes.OK),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't update blog", e, res);
	}
};

export const checkBlogSlug = async (
	req: ERequest<WebSiteDocumentI, any, ResponseI<boolean>, any, { slug: string; blogId?: string }>,
	res: Response<ResponseI<boolean>>
) => {
	const website = req.records!.website!;
	try {
		const blog = await blogModel.exists({
			website: website._id,
			slug: req.query.slug,
			...(req.query.blogId
				? {
						_id: {
							$ne: req.query.blogId,
						},
					}
				: {}),
		});
		handleServiceResponse(
			new ServiceResponse<boolean>(
				ResponseStatus.Success,
				blog ? 'Slug already exists' : 'Slug is available',
				!!blog,
				StatusCodes.OK
			),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't check slug", e, res);
	}
};

export const getBlogReviews = async (
	req: ERequest<
		WebSiteDocumentI,
		{ blogId: string },
		ResponseI<PublicReviewI<Types.ObjectId, PublicPersonalInformationI<Types.ObjectId>>[]>
	>,
	res: Response<ResponseI<PublicReviewI<Types.ObjectId, PublicPersonalInformationI<Types.ObjectId>>[]>>
) => {
	const website = req.records!.website!;
	const blogId = req.params.blogId;
	try {
		const blog = await blogModel
			.findOne({
				website: website._id,
				_id: blogId,
			})
			.lean();
		if (!blog)
			return handleErrorResponse(StatusCodes.NOT_FOUND, 'Blog not found', new Error('Blog not found'), res);
		const reviews = await reviewModel.aggregate<
			PublicReviewI<Types.ObjectId, PublicPersonalInformationI<Types.ObjectId>>
		>([
			{
				$match: {
					'link.ref': new Types.ObjectId(blogId),
					website: website._id,
				},
			},
			{
				$lookup: {
					from: 'costumers',
					localField: 'createdBy',
					foreignField: '_id',
					as: 'createdBy',
					pipeline: [
						{
							$project: {
								_id: 1,
								firstName: '$personalInformation.firstName',
								lastName: '$personalInformation.lastName',
							},
						},
					],
				},
			},
			{
				$unwind: {
					path: '$createdBy',
					preserveNullAndEmptyArrays: false,
				},
			},
			{
				$sort: {
					createdAt: -1,
				},
			},
		]);
		handleServiceResponse(
			new ServiceResponse<PublicReviewI<Types.ObjectId, PublicPersonalInformationI<Types.ObjectId>>[]>(
				ResponseStatus.Success,
				'Blog reviews fetched successfully',
				reviews,
				StatusCodes.OK
			),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't fetch blog reviews", e, res);
	}
};
export const deleteBlogs = async (
	req: ERequest<WebSiteDocumentI, any, ResponseI<null>, { blogIds: string[] }>,
	res: Response<ResponseI<null>>
) => {
	const website = req.records!.website!;
	try {
		const blogs = await blogModel.deleteMany({
			website: website._id,
			_id: {
				$in: req.body.blogIds,
			},
		});
		if (blogs.deletedCount === 0) throw new Error('Blogs not found');
		if (blogs.deletedCount !== req.body.blogIds.length) throw new Error('Some blogs not found');
		handleServiceResponse(
			new ServiceResponse<null>(ResponseStatus.Success, 'Blogs deleted successfully', null, StatusCodes.OK),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't delete blogs", e, res);
	}
};
