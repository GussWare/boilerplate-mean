import Joi from "joi";
import { password, objectId } from "./custom.validation";

export const getPaginate = {
	query: Joi.object().keys({
		name: Joi.string(),
		surname: Joi.string(),
		email: Joi.string(),
		username: Joi.string(),
		search: Joi.string(),
		page: Joi.number().integer().required(),
		limit: Joi.number().integer().required(),
		sortBy: Joi.string().required(),
	}),
};

export const getUserById = {
	params: Joi.object().keys({
		userId: Joi.string().custom(objectId),
	}),
};

export const createUser = {
	body: Joi.object().keys({
		name: Joi.string().required(),
		surname: Joi.string(),
		picture: Joi.string(),
		username: Joi.string().required(),
		email: Joi.string().required().email(),
		password: Joi.string().required().custom(password),
		repeatPassword: Joi.any().valid(Joi.ref("password")).required(),
	}),
};

export const updateUser = {
	params: Joi.object().keys({
		userId: Joi.required().custom(objectId),
	}),
	body: Joi.object()
		.keys({
			name: Joi.string().required(),
			surname: Joi.string(),
			username: Joi.string(),
			picture: Joi.string(),
			email: Joi.string().email(),
			password: Joi.string().custom(password),
			repeatPassword: Joi.any().valid(Joi.ref("password")).required(),
		})
		.min(1),
};

export const deleteUser = {
	params: Joi.object().keys({
		userId: Joi.string().required().custom(objectId),
	}),
};
