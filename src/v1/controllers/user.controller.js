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

export const getUsers = catchAsyncHelper(async (req, res) => {
	const users = await userService.getUsers();
	res.send({ users });
});

export const getUserById = catchAsyncHelper(async (req, res) => {
	const user = await userService.getUserById(req.params.userId);

	if (!user) {
		throw new ApiError(httpStatus.NOT_FOUND, global.polyglot.t("USERS_ERROR_USER_NOT_FOUND"));
	}

	res.send({ user });
});

export const createUser = catchAsyncHelper(async (req, res) => {
	const user = await userService.createUser(req.body);
	res.send({ user });
});

export const updateUser = catchAsyncHelper(async (req, res) => {
	const user = await userService.updateUser(req.params.userId, req.body);

	if (!user) {
		throw new ApiError(httpStatus.NOT_FOUND, global.polyglot.t("USERS_ERROR_USER_NOT_FOUND"));
	}

	res.send({ user });
});

export const deleteUser = catchAsyncHelper(async (req, res) => {
	const user = await userService.deleteUser(req.params.userId);

	if (!user) {
		throw new ApiError(httpStatus.NOT_FOUND, global.polyglot.t("GENERAL_ERROR_NOT_FOUND"));
	}

	res.send({ user });
});
