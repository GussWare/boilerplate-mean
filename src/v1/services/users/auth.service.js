import * as userService from "./user.service";
import * as tokenService from "../tokens/token.service";
import httpStatus from "http-status";
import ApiError from "../../libraries/api.error.library";
import TokenModel from "../../models/token.model";
import constants from "../../config/constants.config";
import config from "../../config/vars.config";
import loggerHelper from "../../helpers/logger.helper";

export const loginUserWithEmailAndPassword = async (email, password) => {
	const user = await userService.getUserByEmail(email);

	if (!user) {
		throw new Error();
	}

	const isPasswordMatch = await user.isPasswordMatch(password);

	if (!user || !isPasswordMatch) {
		throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect email or password");
	}

	return user;
};

export const logout = async (refreshToken) => {
	const refreshTokenDoc = await TokenModel.findOne({
		token: refreshToken,
		type: constants.TOKEN.TYPE_REFRESH,
		blacklisted: false,
	});

	if (!refreshTokenDoc) {
		throw new ApiError(httpStatus.NOT_FOUND, "Not found");
	}

	await refreshTokenDoc.remove();
};

export const refreshAuth = async (refreshToken) => {
	try {
		const refreshTokenDoc = await tokenService.verifyToken(
			refreshToken,
			constants.TOKEN.TYPE_REFRESH
		);

		const user = await userService.getUserById(refreshTokenDoc.user);

		if (!user) {
			throw new Error();
		}

		await refreshTokenDoc.remove();
		return tokenService.generateAuthTokens(user);
	} catch (error) {
		throw new ApiError(httpStatus.UNAUTHORIZED, "Please authenticate");
	}
};

export const resetPassword = async (resetPasswordToken, newPassword) => {
	try {
		const resetPasswordTokenDoc = await tokenService.verifyToken(
			resetPasswordToken,
			constants.TOKEN.TYPE_RESET_PASSWORD
		);

		const user = await userService.getUserById(resetPasswordTokenDoc.user);

		if (!user) {
			throw new Error();
		}

		const iuser = { password: newPassword };

		await userService.updateUser(user.id, iuser);

		await TokenModel.deleteMany({
			user: user.id,
			type: constants.TOKEN.TYPE_RESET_PASSWORD,
		});
	} catch (error) {
		throw new ApiError(httpStatus.UNAUTHORIZED, "Password reset failed");
	}
};

export const verifyEmail = async (verifyEmailToken) => {
	try {
		const verifyEmailTokenDoc = await tokenService.verifyToken(
			verifyEmailToken,
			constants.TOKEN.TYPE_VERIFY_EMAIL
		);

		const user = await userService.getUserById(verifyEmailTokenDoc.user);

		if (!user) {
			throw new Error();
		}

		await TokenModel.deleteMany({
			user: user.id,
			type: constants.TOKEN.TYPE_VERIFY_EMAIL,
		});

		await userService.updateUser(user.id, { isEmailVerified: true });
	} catch (error) {
		throw new ApiError(httpStatus.UNAUTHORIZED, "Email verification failed");
	}
};
