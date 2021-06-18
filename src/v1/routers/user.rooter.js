import express from "express";
import * as UserController from "../controllers/user.controller";
import * as userValidation from "../validations/user.validation";
import validateMiddleware from "../middlewares/validation.middleware";
import { auth } from "../middlewares/auth.middleware";

const router = express.Router();

router.get(
	"/users",
	[auth("getUsers"), validateMiddleware(userValidation.getPaginate)],
	UserController.getPaginate
);

router.get(
	"/users/:userId",
	[auth("getUserById"), validateMiddleware(userValidation.getUserById)],
	UserController.getUserById
);

router.post(
	"/users",
	[auth("createUser"), validateMiddleware(userValidation.createUser)],
	UserController.createUser
);

router.put(
	"/users/:userId",
	[auth("updateUser"), validateMiddleware(userValidation.updateUser)],
	UserController.updateUser
);

router.delete(
	"/users/:userId",
	[auth("deleteUser"), validateMiddleware(userValidation.deleteUser)],
	UserController.deleteUser
);

export default router;
