import ActionModel from "../../models/action.model";

export const getPaginate = async (filter, options) => {
	const pagination = await ActionModel.paginate(filter, options);
	return pagination;
};

export const getActions = async (moduleId) => {
	const actions = await ActionModel.find({
		module: moduleId,
	});

	return actions;
};

export const getActionById = async (actionId) => {
	const action = await ActionModel.findById({
		module: moduleId,
		_id: actionId,
	});

	return action;
};

export const createAction = async (createBody) => {
	const action = await ActionModel.create(createBody);
	return action;
};

export const updateAction = async ( actionId, updateBody) => {
	const action = await getActionById(actionId);

	if (!action) {
		return null;
	}

	Object.assign(action, updateBody);

	const actionUpdate = await action.save();
	return actionUpdate;
};

export const deleteAction = async (actionId) => {
	const action = await getActionById(actionId);

	if (!action) {
		return null;
	}

	await ActionModel.remove({
		_id: id
	});

	return action;
};
