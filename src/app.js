import express from "express";
import helmet from "helmet";
import compression from "compression";
import cors from "cors";
import morgan from "morgan";
import mongoSanitize from "express-mongo-sanitize";
import createLocaleMiddleware from 'express-locale'
import httpStatus from "http-status";
import jwtStrategy from "./v1/config/password.config";
import passport from "passport";
import config from "./v1/config/vars.config";
import constants from "./v1/config/constants.config";
import {loadPolyglot} from "./v1/middlewares/language.middelware";
import {
	errorConverter,
	errorHandler,
} from "./v1/middlewares/error.middleware";
import rv1 from "./v1/routers/";
import ApiError from "./v1/libraries/api.error.library";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(mongoSanitize());
app.use(createLocaleMiddleware({
	"priority": ["accept-language", "default"],
    "default": "es_Es"
}));

app.use(loadPolyglot);

if (config.env == constants.NODE_ENV_DEVELOPER) {
	app.use(morgan("dev"));
}

app.use("/api", rv1);

// jwt authentication
app.use(passport.initialize());
passport.use("jwt", jwtStrategy);

app.use("/files", express.static("./src/v1/files", { redirect: false }));
app.use("/assets", express.static("./src/v1/assets", { redirect: false }));

// error 404
app.use((req, res, next) => {
	next(new ApiError(httpStatus.NOT_FOUND, global.polyglot.t("GENERAL_ERROR_API_NOT_FOUND")));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

export default app;
