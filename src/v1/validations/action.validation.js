import Joi from "joi";
import { password, objectId } from "./custom.validation";

export const getPaginate = {
	query: Joi.object().keys({
		name: Joi.string(),
		slug: Joi.string(),
		guard: Joi.string(),
		search: Joi.string(),
		moduleId: Joi.string().required(),
		page: Joi.number().integer().required(),
		limit: Joi.number().integer().required(),
		sortBy: Joi.string().required(),
	}),
};

export const getActionById = {
	params: Joi.object().keys({
		actionId: Joi.string().custom(objectId),
	}),
};

export const createModule = {
	body: Joi.object().keys({
		name: Joi.string().required(),
		slug: Joi.string().required(),
		guard: Joi.string().required(),
		description: Joi.string().required(),
		moduleId: Joi.string().custom(objectId),
	}),
};

export const updateModule = {
	params: Joi.object().keys({
		actionId: Joi.required().custom(objectId),
	}),
	body: Joi.object()
		.keys({
			name: Joi.string().required(),
			slug: Joi.string().required(),
			guard: Joi.string().required(),
			description: Joi.string().required(),
			moduleId: Joi.string().custom(objectId),
		})
		.min(1),
};

export const deleteModule = {
	params: Joi.object().keys({
		actionId: Joi.string().required().custom(objectId),
	}),
};
