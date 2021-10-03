import express from "express";
import * as ModuleController from "../controllers/module.controller";
import * as moduleValidation from "../validations/module.validation";
import validateMiddleware from "../middlewares/validation.middleware";
import { auth } from "../middlewares/auth.middleware";

const router = express.Router();

router.get(
	"/modules",
	[auth("modules_list"), validateMiddleware(moduleValidation.getPaginate)],
	ModuleController.getPaginate
);

router.get(
	"/modules/:moduleId",
	[auth("modules_get_by_id"), validateMiddleware(moduleValidation.getModuleById)],
	ModuleController.getModuleById
);

router.post(
	"/modules",
	[auth("modules_create"), validateMiddleware(moduleValidation.createModule)],
	ModuleController.createModule
);

router.put(
	"/modules/:moduleId",
	[auth("modules_update"), validateMiddleware(moduleValidation.updateModule)],
	ModuleController.updateModule
);

router.delete(
	"/modules/:moduleId",
	[auth("modules_delete"), validateMiddleware(moduleValidation.deleteModule)],
	ModuleController.deleteModule
);

router.patch(
	"/modules/:moduleId",
	[auth("modules_update"), validateMiddleware(moduleValidation.getModuleById)],
	ModuleController.updateModule
);



export default router;