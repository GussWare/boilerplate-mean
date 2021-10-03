import * as userFaker from "./user.faker";
import * as moduleFaker from "./modules.fake";

const initFaker = async () => {
	await userFaker.userInitFaker();
	await moduleFaker.moduleInitFaker();
};

export default initFaker;
