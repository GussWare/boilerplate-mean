import Joi from "joi";

export const fibonacci = {
	body: Joi.object().keys({
		fib: Joi.number().required(),
	}),
};

