import mongoose from "mongoose";
import httpStatus from "http-status";
import config from "../config/vars.config";
import constants from "../config/constants.config";
import loggerHelper from "../helpers/logger.helper";
import ApiError from "../libraries/api.error.library";

export const errorConverter = (err, req, res, next) => {
	let error = err;

	if (!(error instanceof ApiError)) {
		let statusCode = null;

		if (error.statusCode) {
			statusCode = error.statusCode;
		} else {
			if (error instanceof mongoose.Error) {
				statusCode = httpStatus.INTERNAL_SERVER_ERROR;
			} else {
				statusCode = httpStatus.BAD_REQUEST;
			}
		}

		const message = error.message || httpStatus[statusCode];
		error = new ApiError(statusCode, message, false, err.stack);
	}
	next(error);
};

// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, req, res, next) => {
	let { statusCode, message } = err;

	if (config.env === constants.NODE_ENV_PRODUCTION && !err.isOperational) {
		statusCode = httpStatus.INTERNAL_SERVER_ERROR;
		message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
	}

	res.locals.errorMessage = err.message;

	const response = {
		code: statusCode,
		message,
		...(config.env === constants.NODE_ENV_DEVELOPER && { stack: err.stack }),
	};

	if (config.env === constants.NODE_ENV_DEVELOPER) {
		loggerHelper.error(err);
	}

	res.status(statusCode).send(response);
};
