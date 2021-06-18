import fs from "fs/promises";

export const mkdirPath = async (folder, path) => {
	const pathArr = path.split("/");

	let pathConcat = "";
	for (const i in pathArr) {
		if (pathArr[i]) {
			pathConcat = `${folder}/${pathConcat}/${pathArr[i]}`;
			await fs.mkdir(pathConcat);
		}
	}

	return pathConcat;
};

export const fileExist = async (file) => {
	return await fs.readdir(file);
};

export const moveFile = async (oldPath, oldFile, newPath, newFile) => {};
