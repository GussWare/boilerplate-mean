import httpStatus from "http-status";
import catchAsyncHelper from "../helpers/catch.async.helper";
import * as userService from "../services/users/user.service";
import * as tokenService from "../services/tokens/token.service";
import * as authService from "../services/users/auth.service";
import * as emailService from "../services/emails/email.service";
import ApiError from "../libraries/api.error.library";
import loggerHelper from "../helpers/logger.helper";
import constants from "../config/constants.config";

export const register = catchAsyncHelper(async (req, res) => {
	const user = await userService.createUser(req.body);
	const tokens = await tokenService.generateAuthTokens(user);

	res.status(httpStatus.CREATED).send({ user, tokens });
});

export const uploadUserPicture = catchAsyncHelper(async (req, res) => {
	if (!req.files || Object.keys(req.files).length === 0) {
		throw new ApiError(httpStatus.BAD_REQUEST, "No files were uploaded.");
	}

	let file = req.files.file;
	let uploadPath = `${constants.FOLDERS.TEMP}/${file.name}`;

	// Use the mv() method to place the file somewhere on your server
	file.mv(uploadPath, (err) => {
		if (err) return res.status(500).send(err);

		res.send({
			name: file.name,
		});
	});
});

export const login = catchAsyncHelper(async (req, res) => {
	const { email, password } = req.body;
	const user = await authService.loginUserWithEmailAndPassword(email, password);
	const tokens = await tokenService.generateAuthTokens(user);

	res.send({ user, tokens });
});

export const logout = catchAsyncHelper(async (req, res) => {
	await authService.logout(req.body.refreshToken);
	res.status(httpStatus.NO_CONTENT).send();
});

export const refreshTokens = catchAsyncHelper(async (req, res) => {
	const tokens = await authService.refreshAuth(req.body.refreshToken);
	res.send({ ...tokens });
});

export const forgotPassword = catchAsyncHelper(async (req, res) => {
	const resetPasswordToken = await tokenService.generateResetPasswordToken(
		req.body.email
	);

	await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);

	res.status(httpStatus.NO_CONTENT).send();
});

export const resetPassword = catchAsyncHelper(async (req, res) => {
	const token = req.query.token;
	const password = req.body.password;

	await authService.resetPassword(token, password);
	res.status(httpStatus.NO_CONTENT).send();
});

export const sendVerificationEmail = catchAsyncHelper(async (req, res) => {
	const verifyEmailToken = await tokenService.generateVerifyEmailToken(
		req.user
	);

	await emailService.sendVerificationEmail(req.user.email, verifyEmailToken);

	res.status(httpStatus.NO_CONTENT).send();
});

export const verifyEmail = catchAsyncHelper(async (req, res) => {
	const token = req.query.token;
	await authService.verifyEmail(token);

	res.status(httpStatus.NO_CONTENT).send();
});
