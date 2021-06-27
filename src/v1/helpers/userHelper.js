import constants from "../config/constants.config";
import * as fileHelper from "./file.helper";
import config from "../config/vars.config"

/**
 * Retorna el fode
 * @returns 
 */
export const getFolderUsers = async () => {
    const folderUsers = constants.FOLDERS.USERS;
    return folderUsers;
}

/**
 * Retorna la ruta de la carpeta de usuarios
 * 
 * @param {int} userId 
 * @returns 
 */
export const getFolderUserById = async (userId) => {
	const folderUsers = await getFolderUsers();
    const folderByUserId = `${folderUsers}/${userId}`;

    return folderByUserId;
};

/**
 * Retorna la ruta fisica hacia la imagen del usuario 
 * 
 * @param {*} userId 
 * @param {*} picture 
 * @returns 
 */
export const getFilePictureUser = async (userId, picture) => {
    const folderUserById = await getFolderUserById(userId);
    const picturePath = `${folderUserById}/${picture}`;

    return (await fileHelper.fileExist(picturePath)) ? picturePath : null;
};

/**
 * Metodo que retorna al url para el acceso a las imagen del usuario
 * 
 * @param {int} userId 
 * @param {string} picture 
 * @returns string | null
 */
export const getWebPictureUser = async (userId, picture) => {
    const picturePath = await getFilePictureUser(userId, picture);

    if(!picturePath) {
        return null;
    }

    const pictureWebPath = `${constants.WEB.FILES.USERS}/${userId}/${picture}`;
    return pictureWebPath;
};