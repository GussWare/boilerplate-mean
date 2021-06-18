import express from "express";
import userRoute from "./user.rooter";
import authRoute from "./auth.router";
import testRoute from "./test.router";
import config from "../config/vars.config";
import constants from "../config/vars.config";

const router = express.Router();

const defaultRoutes = [
	{
		path: "/v1",
		route: userRoute,
	},
	{
		path: "/v1",
		route: authRoute,
	},
	{
		path: "/v1",
		route: testRoute,
	},
];

defaultRoutes.forEach((route) => {
	router.use(route.path, route.route);
});

/* no agregar en produccion */
if (config.env === constants.NODE_ENV_DEVELOPER) {
	devRoutes.forEach((route) => {
		router.use(route.path, route.route);
	});
}

export default router;
