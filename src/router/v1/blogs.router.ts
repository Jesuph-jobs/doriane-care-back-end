import { Router } from 'express';

import {
	checkBlogSlug,
	createBlog,
	deleteBlogs,
	getBlogById,
	getBlogReviews,
	getBlogs,
	getDisabledBlogs,
	getDraftBlogs,
	updateBlogCategory,
	updateBlogImages,
	updateBlogInformation,
	updateBlogLabels,
	updateBlogState,
} from '@server/handlers/blogs';

const blogsRouter = Router();

blogsRouter.route('/').get(getBlogs).post(createBlog).delete(deleteBlogs);
blogsRouter.route('/drafts').get(getDraftBlogs);
blogsRouter.route('/disabled').get(getDisabledBlogs);
blogsRouter.route('/slug').get(checkBlogSlug);
blogsRouter.route('/:blogId/state').put(updateBlogState);
blogsRouter.route('/:blogId/labels').put(updateBlogLabels);
blogsRouter.route('/:blogId/category').put(updateBlogCategory);
blogsRouter.route('/:blogId/images').put(updateBlogImages);
blogsRouter.route('/:blogId/reviews').get(getBlogReviews);
blogsRouter.route('/:blogId/information').put(updateBlogInformation);
blogsRouter.route('/:blogId').get(getBlogById);

export default blogsRouter;
