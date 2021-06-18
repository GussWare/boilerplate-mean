import RoleModel from "../../models/Role.model";

export const getPaginate = async (filter, options) => {
	const pagination = await RoleModel.paginate(filter, options);
	return pagination;
};

export const getRoles = async () => {
	const roles = await RoleModel.find();
	return roles;
};

export const getRoleById = async (id) => {
	const role = await RoleModel.findById(id);
	return role;
};

export const createRole = async (createBody) => {
	const role = await RoleModel.create(createBody);
	return role;
};

export const updateRole = async (id, updateBody) => {
	const role = await getRoleById(id);

	if (!role) {
		return null;
	}

	Object.assign(role, updateBody);

	const roleUpdated = await Role.save();
	return roleUpdated;
};

export const deleteRole = async (id) => {
	const role = await getRoleById(id);

	if (!role) {
		return null;
	}

	await RoleModel.remove();

	return role;
};
