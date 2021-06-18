import winston from "winston";
import config from "../config/vars.config";
import constants from "../config/constants.config";

const enumerateErrorFormat = winston.format((info) => {
	if (info instanceof Error) {
		Object.assign(info, { message: info.stack });
	}
	return info;
});

const loggerHelper = winston.createLogger({
	level: config.env === constants.NODE_ENV_DEVELOPER ? "debug" : "info",
	format: winston.format.combine(
		enumerateErrorFormat(),
		config.env === constants.NODE_ENV_DEVELOPER
			? winston.format.colorize()
			: winston.format.uncolorize(),
		winston.format.splat(),
		winston.format.printf(({ level, message }) => `${level}: ${message}`)
	),
	transports: [
		new winston.transports.Console({
			stderrLevels: ["error"],
		}),
	],
});

export default loggerHelper;
