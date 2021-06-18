import PermissionModel from "../../models/Permission.model";

export const getPaginate = async (filter, options) => {
	const pagination = await PermissionModel.paginate(filter, options);
	return pagination;
};

export const getPermissions = async () => {
	const permissions = await PermissionModel.find();
	return permissions;
};

export const getPermissionById = async (id) => {
	const permission = await PermissionModel.findById(id);
	return permission;
};

export const getPermissionByEmail = async (email) => {
	const permission = await PermissionModel.findOne({ email });
	return permission;
};

export const createPermission = async (createBody) => {
	const permission = await PermissionModel.create(createBody);
	return permission;
};

export const updatePermission = async (id, updateBody) => {
	const permission = await getPermissionById(id);

	if (!permission) {
		return null;
	}

	Object.assign(permission, updateBody);

	const permissionUpdate = await permission.save();
	return permissionUpdate;
};

export const deletePermission = async (id) => {
	const permission = await getPermissionById(id);

	if (!permission) {
		return null;
	}

	await PermissionModel.remove();

	return permission;
};
