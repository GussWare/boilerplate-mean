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

	if (!user || !user.enabled) {
		throw new ApiError(
			httpStatus.UNAUTHORIZED,
			global.polyglot.t("USERS_ERROR_USER_NOT_FOUND")
		);
	}

	const isPasswordMatch = await user.isPasswordMatch(password);

	if (!user || !isPasswordMatch) {
		throw new ApiError(
			httpStatus.UNAUTHORIZED,
			global.polyglot.t("USERS_ERROR_INCORRECT_EMAIL_AND_OR_PASSWORD")
		);
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
		throw new ApiError(
			httpStatus.NOT_FOUND,
			global.polyglot.t("GENERAL_ERROR_NOT_FOUND")
		);
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

		if (!user || !user.enabled) {
			throw new Error();
		}

		await refreshTokenDoc.remove();
		return tokenService.generateAuthTokens(user);
	} catch (error) {
		throw new ApiError(
			httpStatus.UNAUTHORIZED,
			global.polyglot.t("AUTH_ERROR_PLEASE_AUTHENTICATE")
		);
	}
};

export const resetPassword = async (resetPasswordToken, newPassword) => {
	try {
		const resetPasswordTokenDoc = await tokenService.verifyToken(
			resetPasswordToken,
			constants.TOKEN.TYPE_RESET_PASSWORD
		);

		const user = await userService.getUserById(resetPasswordTokenDoc.user);

		if (!user || !user.enabled) {
			throw new Error();
		}

		const iuser = { password: newPassword };

		await userService.updateUser(user.id, iuser);

		await TokenModel.deleteMany({
			user: user.id,
			type: constants.TOKEN.TYPE_RESET_PASSWORD,
		});
	} catch (error) {
		throw new ApiError(
			httpStatus.UNAUTHORIZED,
			global.polyglot.t("AUTH_ERROR_PASSWORD_RESET_FAILED")
		);
	}
};

export const verifyEmail = async (verifyEmailToken) => {
	try {
		const verifyEmailTokenDoc = await tokenService.verifyToken(
			verifyEmailToken,
			constants.TOKEN.TYPE_VERIFY_EMAIL
		);

		const user = await userService.getUserById(verifyEmailTokenDoc.user);

		if (!user || !user.enabled) {
			throw new Error();
		}

		await TokenModel.deleteMany({
			user: user.id,
			type: constants.TOKEN.TYPE_VERIFY_EMAIL,
		});

		await userService.updateUser(user.id, { isEmailVerified: true });
	} catch (error) {
		throw new ApiError(
			httpStatus.UNAUTHORIZED,
			global.polyglot.t("AUTH_ERROR_EMAIL_VERIFICATION_FAILED")
		);
	}
};
