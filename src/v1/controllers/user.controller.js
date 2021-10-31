import httpStatus from "http-status";
import * as userService from "../services/users/user.service";
import ApiError from "../libraries/api.error.library";
import pickHelper from "../helpers/pick.helper";
import loggerHelper from "../helpers/logger.helper";
import catchAsyncHelper from "../helpers/catch.async.helper";

export const getPaginate = catchAsyncHelper(async (req, res) => {
	const filter = pickHelper(req.query, ["username", "email"]);
	const options = pickHelper(req.query, ["search", "sortBy", "limit", "page"]);

	const response = await userService.getPaginate(filter, options);

	res.send(response);
});

export const getAll = catchAsyncHelper(async (req, res) => {
	const users = await userService.getAll();
	res.send({ users });
});

export const getById = catchAsyncHelper(async (req, res) => {
	const user = await userService.getById(req.params.userId);

	if (!user) {
		throw new ApiError(httpStatus.NOT_FOUND, global.polyglot.t("USERS_ERROR_USER_NOT_FOUND"));
	}

	res.send({ user });
});

export const create = catchAsyncHelper(async (req, res) => {
	const user = await userService.create(req.body);
	res.send({ user });
});

export const update = catchAsyncHelper(async (req, res) => {
	const user = await userService.update(req.params.userId, req.body);

	if (!user) {
		throw new ApiError(httpStatus.NOT_FOUND, global.polyglot.t("USERS_ERROR_USER_NOT_FOUND"));
	}

	res.send({ user });
});

export const remove = catchAsyncHelper(async (req, res) => {
	const user = await userService.remove(req.params.userId);

	if (!user) {
		throw new ApiError(httpStatus.NOT_FOUND, global.polyglot.t("GENERAL_ERROR_NOT_FOUND"));
	}

	res.send({ user });
});
