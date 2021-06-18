import app from "./app";
import mongoose from "mongoose";
import config from "./v1/config/vars.config";
import loggerHelper from "./v1/helpers/logger.helper";

let server = null;
mongoose.connect(config.mongoose.uri, config.mongoose.options, (err, res) => {
	if (err) {
		throw err;
	} else {
		loggerHelper.info(`Conexion con MongoDB`);
		server = app.listen(config.port, () => {
			loggerHelper.info(`Servidor corriendo en puerto ${config.port}`);
		});
	}
});

const exitHandler = () => {
	if (server) {
		server.close(() => {
			loggerHelper.info("Server closed");
			process.exit(1);
		});
	} else {
		process.exit(1);
	}
};

const unexpectedErrorHandler = (error) => {
	loggerHelper.error(error);
	exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
	loggerHelper.info("SIGTERM received");
	if (server) {
		server.close();
	}
});
