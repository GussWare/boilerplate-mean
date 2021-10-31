import express from "express";
import * as UserController from "../controllers/user.controller";
import * as userValidation from "../validations/user.validation";
import validateMiddleware from "../middlewares/validation.middleware";
import { auth } from "../middlewares/auth.middleware";

const router = express.Router();

router.get(
	"/users",
	[auth("users_paginate"), validateMiddleware(userValidation.getPaginate)],
	UserController.getPaginate
);

router.get(
	"/users/:userId",
	[auth("users_get_by_id"), validateMiddleware(userValidation.getById)],
	UserController.getById
);

router.post(
	"/users",
	[auth("users_create"), validateMiddleware(userValidation.create)],
	UserController.create
);

router.put(
	"/users/:userId",
	[auth("users_update"), validateMiddleware(userValidation.update)],
	UserController.update
);

router.delete(
	"/users/:userId",
	[auth("users_delete"), validateMiddleware(userValidation.remove)],
	UserController.remove
);

router.patch(
	"/users/:userId",
	[auth("users_patch"), validateMiddleware(userValidation.getById)],
	UserController.update
);

export default router;
