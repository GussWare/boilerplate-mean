import express from "express";
import * as ModuleController from "../controllers/module.controller";
import * as moduleValidation from "../validations/module.validation";
import validateMiddleware from "../middlewares/validation.middleware";
import { auth } from "../middlewares/auth.middleware";

const router = express.Router();

router.get(
	"/modules",
	[auth("getModules"), validateMiddleware(moduleValidation.getPaginate)],
	ModuleController.getPaginate
);

router.get(
	"/modules/:moduleId",
	[auth("getModuleById"), validateMiddleware(moduleValidation.getModuleById)],
	ModuleController.getModuleById
);

router.post(
	"/modules",
	[auth("createModule"), validateMiddleware(moduleValidation.createModule)],
	ModuleController.createModule
);

router.put(
	"/modules/:moduleId",
	[auth("updateModule"), validateMiddleware(moduleValidation.updateModule)],
	ModuleController.updateModule
);

router.delete(
	"/modules/:moduleId",
	[auth("deleteModule"), validateMiddleware(moduleValidation.deleteModule)],
	ModuleController.deleteModule
);

router.patch(
	"/modules/:moduleId",
	[auth("enabledModule"), validateMiddleware(moduleValidation.getModuleById)],
	ModuleController.updateModule
);



export default router;