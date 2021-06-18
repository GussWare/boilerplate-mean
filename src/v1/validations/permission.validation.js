import Joi from "joi";
import { password, objectId } from "./custom.validation";

export const getPaginate = {
	query: Joi.object().keys({
		page: Joi.number().integer().required(),
		limit: Joi.number().integer().required(),
		sortBy: Joi.string().required(),
	}),
};

export const getPermissionById = {
	params: Joi.object().keys({
		permissionId: Joi.string().custom(objectId),
	}),
};

export const createPermission = {
	body: Joi.object().keys({
		name: Joi.string().required(),
		slug: Joi.string().required(),
		guard: Joi.string().required(),
		description: Joi.string().required(),
	}),
};

export const updatePermission = {
	params: Joi.object().keys({
		permissionId: Joi.required().custom(objectId),
	}),
	body: Joi.object()
		.keys({
			name: Joi.string().required(),
			slug: Joi.string().required(),
			guard: Joi.string().required(),
			description: Joi.string().required(),
		})
		.min(1),
};

export const deletePermission = {
	params: Joi.object().keys({
		permissionId: Joi.string().required().custom(objectId),
	}),
};
