import httpStatus from "http-status";
import UserModel from "../../models/user.model";
import ApiError from "../../libraries/api.error.library";
import fs from "fs-extra";
import constants from "../../config/constants.config";

export const getPaginate = async (filter, options) => {
	const pagination = await UserModel.paginate(filter, options);

	return pagination;
};

export const getUsers = async () => {
	const users = await UserModel.find();
	return users;
};

export const getUserById = async (id) => {
	const user = await UserModel.findById(id);
	return user;
};

export const getUserByEmail = async (email) => {
	const user = await UserModel.findOne({ email: email });
	return user;
};

export const createUser = async (createBody) => {
	if (await UserModel.isEmailTaken(createBody.email)) {
		throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
	}

	const user = await UserModel.create(createBody);

	if (user.picture) {
		const pathTmp = `${constants.FOLDER_TEM}`;
		const path = `${constants.FOLDER_USERS}/${user.id}`;

		await fs.ensureDirSync(path);
		await fs.copySync(`${pathTmp}/${user.picture}`, `${path}/${user.picture}`);
		await fs.removeSync(`${pathTmp}/${user.picture}`);
	}

	return user;
};

export const updateUser = async (id, updateBody) => {
	const user = await getUserById(id);

	if (!user) {
		return null;
	}

	const isEmailTaken = await UserModel.isEmailTaken(updateBody.email, id);

	if (updateBody.email && isEmailTaken) {
		throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
	}

	Object.assign(user, updateBody);

	const userUpdated = await user.save();
	return userUpdated;
};

export const deleteUser = async (id) => {
	const user = await getUserById(id);

	if (!user) {
		return null;
	}

	await UserModel.remove();

	return user;
};
