import Joi from "joi";
import httpStatus from "http-status";
import pickHelper from "../helpers/pick.helper";
import ApiError from "../../v1/libraries/api.error.library";
import loggerHelper from "../helpers/logger.helper";

const validateMiddleware = (schema) => (req, res, next) => {
	const validSchema = pickHelper(schema, ["params", "query", "body"]);
	const object = pickHelper(req, Object.keys(validSchema));
	const { value, error } = Joi.compile(validSchema)
		.prefs({ errors: { label: "key" } })
		.validate(object);

	if (error) {
		const errorMessage = error.details
			.map((details) => details.message)
			.join(", ");
		return next(new ApiError(httpStatus.BAD_REQUEST, errorMessage));
	}

	Object.assign(req, value);
	return next();
};

export default validateMiddleware;
