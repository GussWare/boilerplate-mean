const roles = ["admin"];

const roleRights = new Map();
roleRights.set(roles[0], [
	"getUsers",
	"getUserById",
	"createUser",
	"updateUser",
	"deleteUser",
]);

export { roles, roleRights };
