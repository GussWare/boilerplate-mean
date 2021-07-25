import constants from "../config/constants.config";
import catchAsyncHelper from "../helpers/catch.async.helper";
import loggerHelper from "../helpers/logger.helper";
import initFaker from "../fakers/init.faker";
import fs from "fs-extra";

export const testFs = catchAsyncHelper(async (req, res) => {
	const path = constants.FOLDERS.USERS + "/1";
	await fs.ensureDirSync(path);

	res.send({
		message: "Folders creados",
	});
});

export const faker = catchAsyncHelper(async (req, res) => {
	await initFaker();

	res.send({
		message: "Faker complete",
	});
});
