const roles = ["admin"];

const roleRights = new Map();
roleRights.set(roles[0], [
	"getUsers",
	"getUserById",
	"createUser",
	"updateUser",
	"deleteUser",
	"enabledUser",
	"disabledUser",

	"getModules",
	"getModuleById",
	"createModule",
	"updateModule",
	"deleteModule",
	"enabledModule",
	"disabledModule",
]);

export { roles, roleRights };
