import { handleErrorResponse, handleServiceResponse } from '@server/utils/httpHandlers';
import { ResponseStatus, ServiceResponse } from '@server/utils/serviceResponse';
import type { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import type { ERequest } from '!server/E_Express';
import roleModel from '&common/Role';
import userModel from '&common/user';
import { rolesManagerService } from '@server/services';
import { Types, isObjectIdOrHexString } from 'mongoose';

export const getRoles = async (
	req: ERequest<WebSiteDocumentI, any, ResponseI<BaseRoleI[]>>,
	res: Response<ResponseI<BaseRoleI[]>>
) => {
	const website = req.records!.website!;
	const roles = rolesManagerService.getRoles(website._id);

	try {
		handleServiceResponse(
			new ServiceResponse<BaseRoleI[]>(
				ResponseStatus.Success,
				'Roles fetched successfully',
				roles.map(r => r.toBaseObject()),
				StatusCodes.OK
			),
			res
		);
	} catch (e) {
		console.error(e);
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't fetch roles", e, res);
	}
};
export const getSimpleRoles = async (
	req: ERequest<
		WebSiteDocumentI,
		any,
		ResponseI<SimpleRoleI[]>,
		{
			isGlobal: string;
		}
	>,
	res: Response<ResponseI<SimpleRoleI[]>>
) => {
	const website = req.records!.website!;
	const isGlobal = Boolean(req.query.isGlobal);
	const roles = rolesManagerService.getRoles(isGlobal ? undefined : website._id);

	try {
		handleServiceResponse(
			new ServiceResponse<SimpleRoleI[]>(
				ResponseStatus.Success,
				'Roles fetched successfully',
				roles.map(r => r.toSimpleObject()),
				StatusCodes.OK
			),
			res
		);
	} catch (e) {
		console.error(e);
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't fetch roles", e, res);
	}
};
export const getGlobalRoles = async (
	_req: ERequest<WebSiteDocumentI, any, ResponseI<BaseRoleI[]>>,
	res: Response<ResponseI<BaseRoleI[]>>
) => {
	const roles = rolesManagerService.getRoles();

	try {
		handleServiceResponse(
			new ServiceResponse<BaseRoleI[]>(
				ResponseStatus.Success,
				'Roles fetched successfully',
				roles.map(r => r.toBaseObject()),
				StatusCodes.OK
			),
			res
		);
	} catch (e) {
		console.error(e);
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't fetch roles", e, res);
	}
};

export const createRole = async (
	req: ERequest<WebSiteDocumentI | UserDocumentI, any, ResponseI<PublicRoleI>, BaseRoleI>,
	res: Response<ResponseI<PublicRoleI>>
) => {
	const role = req.body;
	const website = req.records!.website!;
	const user = req.records!.user!;
	try {
		if (role.website && !website._id.equals(role.website))
			throw new Error('You cannot create a role for different website');
		const hasPermission = rolesManagerService.rolesHavePermission(
			user.roles,
			role.website ? ['role:create'] : ['role:create_global'],
			role.website ? new Types.ObjectId(role.website) : undefined
		);
		if (!hasPermission) throw new Error(`Can not create ${role.website ? '' : 'global '}role`);

		const newRole = await roleModel.create(req.body);
		rolesManagerService.roles.set(newRole._id.toString(), newRole);

		handleServiceResponse(
			new ServiceResponse<PublicRoleI>(
				ResponseStatus.Success,
				'Roles created successfully',
				newRole.toOptimizedObject(),
				StatusCodes.OK
			),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't create role", e, res);
	}
};
export const deleteRole = async (
	req: ERequest<WebSiteDocumentI | UserDocumentI, { roleId: string }, ResponseI<null>>,
	res: Response<ResponseI<null>>
) => {
	const website = req.records!.website!;
	const user = req.records!.user!;
	try {
		const roleId = req.params.roleId;
		if (!isObjectIdOrHexString(roleId)) throw new Error(`Invalid role id: ${roleId}`);
		const role = rolesManagerService.roles.get(roleId);
		if (!role) throw new Error("Could't find role");
		if (role.website && !website._id.equals(role.website))
			//
			throw new Error('You cannot delete a role for different website');
		const hasPermission = rolesManagerService.rolesHavePermission(
			user.roles,
			role.website ? ['role:delete'] : ['role:delete_global'],
			role.website ? new Types.ObjectId(role.website) : undefined
		);
		if (!hasPermission) throw new Error(`Can not delete ${role.website ? '' : 'global '}role ${roleId}`);

		rolesManagerService.roles.delete(role._id.toString());
		const roleIdO = new Types.ObjectId(roleId);
		await Promise.all([
			role.deleteOne(),
			userModel.updateMany(
				{ roles: roleIdO }, // Find users where roles array contains the new Types.ObjectId(roleId)
				{ $pull: { roles: roleIdO } } // Remove the roleId from the roles array
			),
		]);

		handleServiceResponse(
			new ServiceResponse<null>(ResponseStatus.Success, 'Roles deleted successfully', null, StatusCodes.OK),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't delete role", e, res);
	}
};
export const updateRole = async (
	req: ERequest<WebSiteDocumentI | UserDocumentI, { roleId: string }, ResponseI<null>, RoleI>,
	res: Response<ResponseI<null>>
) => {
	const website = req.records!.website!;
	const user = req.records!.user!;
	const roleToUpdate = req.body;
	try {
		const roleId = req.params.roleId;
		if (!isObjectIdOrHexString(roleId)) throw new Error(`Invalid role id: ${roleId}`);
		const role = rolesManagerService.roles.get(roleId);
		if (!role) throw new Error("Could't find role");
		if (role.website && !website._id.equals(role.website))
			//
			throw new Error('You cannot edit a role for different website');
		const hasPermission = rolesManagerService.rolesHavePermission(
			user.roles,
			role.website ? ['role:edit'] : ['role:edit_global'],
			role.website ? new Types.ObjectId(role.website) : undefined
		);
		if (!hasPermission) throw new Error(`Can not delete ${role.website ? '' : 'global '}role ${roleId}`);

		role.name = roleToUpdate.name;
		role.description = roleToUpdate.description;
		role.permissions = roleToUpdate.permissions;
		await role.save();

		handleServiceResponse(
			new ServiceResponse<null>(ResponseStatus.Success, 'Roles updated successfully', null, StatusCodes.OK),
			res
		);
	} catch (e) {
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't update role", e, res);
	}
};
export const getRole = async (
	req: ERequest<WebSiteDocumentI | UserDocumentI, { roleId: string }, ResponseI<PublicRoleI>>,
	res: Response<ResponseI<PublicRoleI>>
) => {
	const website = req.records!.website!;
	const user = req.records!.user!;
	try {
		const roleId = req.params.roleId;
		if (!isObjectIdOrHexString(roleId)) throw new Error(`Invalid role id: ${roleId}`);
		const role = rolesManagerService.roles.get(roleId);
		if (!role) throw new Error("Could't find role"); //
		if (role.website && !website._id.equals(role.website))
			throw new Error('You cannot get a role for different website');
		const hasPermission = rolesManagerService.rolesHavePermission(
			user.roles,
			role.website ? ['role:view'] : ['role:view_global'],
			role.website ? new Types.ObjectId(role.website) : undefined
		);
		if (!hasPermission)
			throw new Error(`You don't have permission to get ${role.website ? '' : 'global '}role ${roleId}`);

		handleServiceResponse(
			new ServiceResponse<PublicRoleI>(
				ResponseStatus.Success,
				'Roles fetched successfully',
				role.toOptimizedObject(),
				StatusCodes.OK
			),
			res
		);
	} catch (e) {
		console.error(e);
		handleErrorResponse(StatusCodes.INTERNAL_SERVER_ERROR, "Couldn't get role", e, res);
	}
};
