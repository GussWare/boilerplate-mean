import httpStatus from "http-status";
import catchAsyncHelper from "../helpers/catch.async.helper";
import * as roleService from "../services/roles/roles.service";
import ApiError from "../libraries/api.error.library";
import pickHelper from "../helpers/pick.helper";

export const getPaginate = catchAsyncHelper(async (req, res) => {
	const filter = pickHelper(req.query, []);
	const options = pickHelper(req.query, ["sortBy", "limit", "page"]);

	const response = await roleService.getPaginate(filter, options);

	res.send(response);
});

export const getRoles = catchAsyncHelper(async (req, res) => {
	const roles = await roleService.getRoles();
	res.send({ roles });
});

export const getRoleById = catchAsyncHelper(async (req, res) => {
	const role = await roleService.getRoleById(req.params.roleId);

	if (!role) {
		throw new ApiError(httpStatus.NOT_FOUND, global.polyglot.t("GENERAL_ERROR_NOT_FOUND"));
	}

	res.send({ role });
});

export const createRole = catchAsyncHelper(async (req, res) => {
	const role = await roleService.createRole(req.body);
	res.send({ role });
});

export const updateRole = catchAsyncHelper(async (req, res) => {
	const role = await roleService.updateRole(req.params.roleId, req.body);

	if (!role) {
		throw new ApiError(httpStatus.NOT_FOUND, global.polyglot.t("GENERAL_ERROR_NOT_FOUND"));
	}

	res.send({ role });
});

export const deleteRole = catchAsyncHelper(async (req, res) => {
	const role = await roleService.deleteRole(req.params.roleId);

	if (!role) {
		throw new ApiError(httpStatus.NOT_FOUND, global.polyglot.t("GENERAL_ERROR_NOT_FOUND"));
	}

	res.send({ role });
});
