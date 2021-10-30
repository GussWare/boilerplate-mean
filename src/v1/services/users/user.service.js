import httpStatus from "http-status";
import UserModel from "../../models/user.model";
import ApiError from "../../libraries/api.error.library";
import * as fileHelper from "../../helpers/file.helper";
import * as userHelper from "../../helpers/user.helper";
import * as imgHelper from "../../helpers/img.helper";
import loggerHelper from "../../helpers/logger.helper";

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
		throw new ApiError(httpStatus.BAD_REQUEST, global.polyglot.t("USERS_ERROR_EMAIL_ALREADY_TAKEN"));
	}

	let userPicture = null;
	let imgName = await imgHelper.getWebNameNotImage();
	let imgUrl = await imgHelper.getWebNotImage();
	let thumbnailUrl = await imgHelper.getWebThumbnailNotImage();

	if (createBody.picture) {
		userPicture = createBody.picture;
	}

	createBody.picture = {
		name: imgName,
		imgUrl: imgUrl,
		thumbnailUrl: thumbnailUrl,
	};

	let user = await UserModel.create(createBody);

	if (userPicture) {
		const fileUser = await userHelper.getFolderUserById(user.id);
		const moveFile = await fileHelper.moveTempToDest(
			userPicture,
			fileUser,
			true
		);

		if (moveFile) {
			imgName = userPicture;
			imgUrl = await userHelper.getWebPictureUser(user.id, userPicture);
			thumbnailUrl = await userHelper.getWebPictureUser(user.id, userPicture);

			user.picture = {
				name: imgName,
				imgUrl: imgUrl,
				thumbnailUrl: thumbnailUrl,
			};

			await user.save();
		}
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
		throw new ApiError(httpStatus.BAD_REQUEST, global.polyglot.t("USERS_ERROR_EMAIL_ALREADY_TAKEN"));
	}

	let imgName = null;
	let imgUrl = null;
	let thumbnailUrl = null;

	if (updateBody.picture && updateBody.picture != user.picture.name) {
		const fileUser = await userHelper.getFolderUserById(user.id);
		const moveFile = await fileHelper.moveTempToDest(
			updateBody.picture,
			fileUser,
			true
		);

		if (moveFile) {
			imgName = updateBody.picture;
			imgUrl = await userHelper.getWebPictureUser(user.id, updateBody.picture);
			thumbnailUrl = await userHelper.getWebPictureUser(
				user.id,
				updateBody.picture
			);

			updateBody.picture = {
				name: imgName,
				imgUrl: imgUrl,
				thumbnailUrl: thumbnailUrl,
			};
		}
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

	await UserModel.remove({
		_id: id
	});

	return user;
};
