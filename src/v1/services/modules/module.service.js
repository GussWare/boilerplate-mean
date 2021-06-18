import ModuleModel from "../../models/module.model";

export const getPaginate = async (filter, options) => {
	const pagination = await ModuleModel.paginate(filter, options);
	return pagination;
};

export const getModules = async () => {
	const modules = await ModuleModel.find();
	return modules;
};

export const getModuleById = async (id) => {
	const module = await ModuleModel.findById(id);
	return module;
};

export const getModuleByEmail = async (email) => {
	const module = await ModuleModel.findOne({ email });
	return module;
};

export const createModule = async (createBody) => {
	const module = await ModuleModel.create(createBody);
	return module;
};

export const updateModule = async (id, updateBody) => {
	const module = await getModuleById(id);

	if (!module) {
		return null;
	}

	Object.assign(module, updateBody);

	const moduleUpdated = await module.save();
	return moduleUpdated;
};

export const deleteModule = async (id) => {
	const module = await getModuleById(id);

	if (!module) {
		return null;
	}

	await ModuleModel.remove();

	return module;
};
