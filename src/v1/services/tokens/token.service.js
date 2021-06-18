import moment from "moment";
import jwt from "jsonwebtoken";
import httpStatus from "http-status";
import TokenModel from "../../models/token.model";
import config from "../../config/vars.config";
import constants from "../../config/constants.config";
import ApiError from "../../libraries/api.error.library";
import * as userService from "../../services/users/user.service";

export const generateToken = (
	userId,
	expires,
	type,
	secret = config.jwt.secret
) => {
	const payload = {
		sub: userId,
		iat: moment().unix(),
		exp: expires.unix(),
		type,
	};

	const token = jwt.sign(payload, secret);
	return token;
};

export const saveToken = async (
	token,
	userId,
	expires,
	type,
	blacklisted = false
) => {
	const tokenDoc = await TokenModel.create({
		token,
		user: userId,
		expires: expires.toDate(),
		type,
		blacklisted,
	});

	return tokenDoc;
};

export const verifyToken = async (token, type) => {
	const payload = jwt.verify(token, config.jwt.secret);
	const tokenDoc = await TokenModel.findOne({
		token,
		type,
		user: payload.sub,
		blacklisted: false,
	});

	if (!tokenDoc) {
		throw new Error("Token not found");
	}

	return tokenDoc;
};

export const generateAuthTokens = async (user) => {
	if (!user) {
		return null;
	}

	const accessTokenExpires = moment().add(
		config.jwt.accessExpirationMinutes,
		"minutes"
	);

	const accessToken = generateToken(
		user.id,
		accessTokenExpires,
		constants.TOKEN.TYPE_ACCESS
	);

	const refreshTokenExpires = moment().add(
		config.jwt.refreshExpirationDays,
		"days"
	);

	const refreshToken = generateToken(
		user.id,
		refreshTokenExpires,
		constants.TOKEN.TYPE_REFRESH
	);

	await saveToken(
		refreshToken,
		user.id,
		refreshTokenExpires,
		constants.TOKEN.TYPE_REFRESH
	);

	return {
		access: {
			token: accessToken,
			expires: accessTokenExpires.toDate(),
		},
		refresh: {
			token: refreshToken,
			expires: refreshTokenExpires.toDate(),
		},
	};
};

export const generateResetPasswordToken = async (email) => {
	const user = await userService.getUserByEmail(email);

	if (!user) {
		throw new ApiError(httpStatus.NOT_FOUND, "No users found with this email");
	}

	const expires = moment().add(
		config.jwt.resetPasswordExpirationMinutes,
		"minutes"
	);

	const resetPasswordToken = generateToken(
		user.id,
		expires,
		constants.TOKEN.TYPE_RESET_PASSWORD
	);

	await saveToken(
		resetPasswordToken,
		user.id,
		expires,
		constants.TOKEN.TYPE_RESET_PASSWORD
	);

	return resetPasswordToken;
};

export const generateVerifyEmailToken = async (user) => {
	const expires = moment().add(
		config.jwt.verifyEmailExpirationMinutes,
		"minutes"
	);

	const verifyEmailToken = generateToken(
		user.id,
		expires,
		constants.TOKEN.TYPE_VERIFY_EMAIL
	);

	await saveToken(
		verifyEmailToken,
		user.id,
		expires,
		constants.TOKEN.TYPE_VERIFY_EMAIL
	);

	return verifyEmailToken;
};
