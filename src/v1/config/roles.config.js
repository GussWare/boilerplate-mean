const roles = ["admin"];

const roleRights = new Map();
roleRights.set(roles[0], [
	"users_list",
	"users_get_by_id",
	"users_create",
	"users_update",
	"users_delete",
	"users_patch",

	"modules_list",
	"modules_get_by_id",
	"modules_create",
	"modules_update",
	"modules_delete",
	"modules_patch",
]);

export { roles, roleRights };
