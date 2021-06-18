import constants from "../config/constants.config";
import catchAsyncHelper from "../helpers/catch.async.helper";
import loggerHelper from "../helpers/logger.helper";
import fs from "fs-extra";

export const testFs = catchAsyncHelper(async (req, res) => {
	const path = constants.FOLDER_USERS + "/1";
	await fs.ensureDirSync(path);

	res.send({
		message: "Folders creados",
	});
});
