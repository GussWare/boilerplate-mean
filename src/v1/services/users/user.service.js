import httpStatus from "http-status";
import UserModel from "../../models/user.model";
import ApiError from "../../libraries/api.error.library";
import * as userFileService from "./user.files.service";

export const getPaginate = async (filter, options) => {
	const pagination = await UserModel.paginate(filter, options);
	return pagination;
};

export const getAll = async () => {
	const users = await UserModel.find();
	return users;
};

export const getById = async (id) => {
	const user = await UserModel.findById(id);
	return user;
};

export const getByEmail = async (email) => {
	const user = await UserModel.findOne({ email: email });
	return user;
};

export const create = async (body) => {
	if (await UserModel.isEmailTaken(body.email)) {
		throw new ApiError(httpStatus.BAD_REQUEST, global.polyglot.t("USERS_ERROR_EMAIL_ALREADY_TAKEN"));
	}

	let userPicture = (body.picture) ? body.picture : null;
	body.picture = await userFileService.getUserNotPicture();

	let user = await UserModel.create(body);

	if (!userPicture) {
		return user;
	}

	const moveUserPicture = await userFileService.moveTempToDestUserPicture(user.id, userPicture);

	if (!moveUserPicture) {
		return user;
	}

	user.picture = moveUserPicture;

	await user.save();

	return user;
};

export const update = async (id, body) => {
	const user = await getById(id);

	if (!user) {
		return null;
	}

	const isEmailTaken = await UserModel.isEmailTaken(body.email, id);

	if (body.email && isEmailTaken) {
		throw new ApiError(httpStatus.BAD_REQUEST, global.polyglot.t("USERS_ERROR_EMAIL_ALREADY_TAKEN"));
	}

	if (body.picture && body.picture != user.picture.name) {
		const moveUserPicture =  await userFileService.moveTempToDestUserPicture(id, body.picture);

		if(moveUserPicture) {
			body.picture = moveUserPicture;
		}
	}

	Object.assign(user, body);

	const userUpdated = await user.save();
	return userUpdated;
};

export const remove = async (id) => {
	const user = await getById(id);

	if (!user) {
		return null;
	}

	await UserModel.remove({
		_id: id
	});

	return user;
};
