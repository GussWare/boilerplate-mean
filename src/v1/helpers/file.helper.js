import fs from "fs-extra";
import constants from "../config/constants.config";
import loggerHelper from "./logger.helper";

/**
 * Metodo que se encarga de revisar si un archivo o folder existe
 *
 * @param {*} file
 * @returns boolean
 */
export const fileExist = async (file) => {
	return await fs.pathExists(file);
};

/**
 * Metodo que se encarga de mover un archivo, verifica si la ruta de destino existe si no
 * lo genera de forma automatica, Solo se envia thumbnail true cuando el archivo es imagen y se quiere generar un thumnail en
 * la carpeta de destino
 *
 * @param {*} fileName
 * @param {*} folderSrc
 * @param {*} folderDest
 * @param {*} thumbnail
 */
export const moveFile = async (
	fileName,
	folderSrc,
	folderDest,
	thumbnail = false
) => {
	const fileSrc = `${folderSrc}/${fileName}`;
	const fileDest = `${folderDest}/${fileName}`;

	if (fs.pathExists(fileSrc) == false) {
		return false;
	}

	await fs.ensureDir(folderDest);
	await fs.copySync(fileSrc, fileDest);
	await fs.removeSync(fileSrc);

	return true;
};

/**
 * Muve un archivo que se encuentra en temporal a una ruta de destino,
 * si no existe la ruta de destino la genera
 *
 * @param {*} fileName
 * @param {*} folderDest
 */
export const moveTempToDest = async (fileName, folderDest, thumbnail) => {
	return await moveFile(
		fileName,
		constants.FOLDERS.TEMP,
		folderDest,
		thumbnail
	);
};
