import express from "express";
import * as ActionController from "../controllers/action.controller";
import * as actionValidation from "../validations/action.validation";
import validateMiddleware from "../middlewares/validation.middleware";
import { auth } from "../middlewares/auth.middleware";

const router = express.Router();

router.get(
	"/modules/:moduleId/actions",
	[auth("getActions"), validateMiddleware(actionValidation.getPaginate)],
	ActionController.getPaginate
);

router.get(
	"/modules/:moduleId/actions/:actionId",
	[auth("getActionById"), validateMiddleware(actionValidation.getActionById)],
	ActionController.getActionById
);

router.post(
	"/modules/:moduleId/actions",
	[auth("createAction"), validateMiddleware(actionValidation.createAction)],
	ActionController.createAction
);

router.put(
	"/modules/:moduleId/actions/:actionId",
	[auth("updateAction"), validateMiddleware(actionValidation.updateAction)],
	ActionController.updateAction
);

router.delete(
	"/modules/:moduleId/actions/:actionId",
	[auth("deleteAction"), validateMiddleware(actionValidation.deleteAction)],
	ActionController.deleteAction
);


export default router;