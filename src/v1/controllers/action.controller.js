import httpStatus from "http-status";
import * as actionService from "../services/actions/actions.service";
import ApiError from "../libraries/api.error.library";
import pickHelper from "../helpers/pick.helper";
import loggerHelper from "../helpers/logger.helper";
import catchAsyncHelper from "../helpers/catch.async.helper";

export const getPaginate = catchAsyncHelper(async (req, res) => {
	const filter = pickHelper(req.query, ["name", "slug", "guard", "actionId"]);
	const options = pickHelper(req.query, ["search", "sortBy", "limit", "page"]);

	const response = await actionService.getPaginate(filter, options);

	res.send(response);
});

export const getActions = catchAsyncHelper(async (req, res) => {
	const actions = await actionService.getActions();
	res.send({ actions: actions });
});

export const getActionById = catchAsyncHelper(async (req, res) => {
	const action = await actionService.getActionById(req.params.actionId);

	if (!action) {
		throw new ApiError(httpStatus.NOT_FOUND, global.polyglot.t("GENERAL_ERROR_NOT_FOUND"));
	}

	res.send({ action: action });
});

export const createAction = catchAsyncHelper(async (req, res) => {
	const action = await actionService.createAction(req.body);
	res.send({ action: action });
});

export const updateAction = catchAsyncHelper(async (req, res) => {
	const action = await actionService.updateAction(
		req.params.actionId,
		req.body
	);

	if (!action) {
		throw new ApiError(httpStatus.NOT_FOUND, global.polyglot.t("GENERAL_ERROR_NOT_FOUND"));
	}

	res.send({ action: action });
});

export const deleteAction = catchAsyncHelper(async (req, res) => {
	const action = await actionService.deleteAction(req.params.actionId);

	if (!action) {
		throw new ApiError(httpStatus.NOT_FOUND, global.polyglot.t("GENERAL_ERROR_NOT_FOUND"));
	}

	res.send({ action: action });
});
