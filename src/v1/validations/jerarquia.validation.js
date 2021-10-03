import Joi from "joi";

export const jerarquia = {
	query: Joi.object().keys({
		nombre: Joi.string().required(),
	}),
};

