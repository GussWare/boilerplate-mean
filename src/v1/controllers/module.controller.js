import httpStatus from "http-status";
import * as moduleService from "../services/modules/module.service";
import ApiError from "../libraries/api.error.library";
import pickHelper from "../helpers/pick.helper";
import loggerHelper from "../helpers/logger.helper";
import catchAsyncHelper from "../helpers/catch.async.helper";

export const getPaginate = catchAsyncHelper(async (req, res) => {
	const filter = pickHelper(req.query, ["name", "slug", "guard"]);
	const options = pickHelper(req.query, ["search", "sortBy", "limit", "page"]);

	const response = await moduleService.getPaginate(filter, options);

	res.send(response);
});

export const getModules = catchAsyncHelper(async (req, res) => {
	const modulees = await moduleService.getModules();
	res.send({ modules: modulees });
});

export const getModuleById = catchAsyncHelper(async (req, res) => {
	const modulee = await moduleService.getModuleById(req.params.moduleId);

	if (!modulee) {
		throw new ApiError(httpStatus.NOT_FOUND, "Module not found");
	}

	res.send({ module:modulee });
});

export const createModule = catchAsyncHelper(async (req, res) => {
	const modulee = await moduleService.createModule(req.body);
	res.send({ module: modulee });
});

export const updateModule = catchAsyncHelper(async (req, res) => {
	const modulee = await moduleService.updateModule(
		req.params.moduleId,
		req.body
	);

	if (!modulee) {
		throw new ApiError(httpStatus.NOT_FOUND, "Module not found");
	}

	res.send({ module: modulee });
});

export const deleteModule = catchAsyncHelper(async (req, res) => {
	const modulee = await moduleService.deleteModule(req.params.moduleId);

	if (!modulee) {
		throw new ApiError(httpStatus.NOT_FOUND, "Registro no encontrado");
	}

	res.send({ module: modulee });
});
