import express from "express";
import * as UserController from "../controllers/user.controller";
import * as userValidation from "../validations/user.validation";
import validateMiddleware from "../middlewares/validation.middleware";
import { auth } from "../middlewares/auth.middleware";

const router = express.Router();

router.get(
	"/users",
	[auth("users_list"), validateMiddleware(userValidation.getPaginate)],
	UserController.getPaginate
);

router.get(
	"/users/:userId",
	[auth("users_get_by_id"), validateMiddleware(userValidation.userById)],
	UserController.getUserById
);

router.post(
	"/users",
	[auth("users_create"), validateMiddleware(userValidation.createUser)],
	UserController.createUser
);

router.put(
	"/users/:userId",
	[auth("users_update"), validateMiddleware(userValidation.updateUser)],
	UserController.updateUser
);

router.delete(
	"/users/:userId",
	[auth("users_delete"), validateMiddleware(userValidation.deleteUser)],
	UserController.deleteUser
);

router.patch(
	"/users/:userId",
	[auth("users_patch"), validateMiddleware(userValidation.userById)],
	UserController.updateUser
);

export default router;
