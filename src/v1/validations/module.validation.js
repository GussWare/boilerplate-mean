import Joi from "joi";
import { password, objectId } from "./custom.validation";

export const getPaginate = {
	query: Joi.object().keys({
		name: Joi.string(),
		slug: Joi.string(),
		guard: Joi.string(),
		search: Joi.string(),
		page: Joi.number().integer().required(),
		limit: Joi.number().integer().required(),
		sortBy: Joi.string().required(),
	}),
};

export const getModuleById = {
	params: Joi.object().keys({
		moduleId: Joi.string().custom(objectId),
	}),
};

export const createModule = {
	body: Joi.object().keys({
		name: Joi.string().required(),
		slug: Joi.string().required(),
		guard: Joi.string().required(),
		description: Joi.string().required(),
	}),
};

export const updateModule = {
	params: Joi.object().keys({
		moduleId: Joi.required().custom(objectId),
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

export const deleteModule = {
	params: Joi.object().keys({
		moduleId: Joi.string().required().custom(objectId),
	}),
};
