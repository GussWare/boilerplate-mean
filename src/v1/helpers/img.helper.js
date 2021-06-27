import constants from "../config/constants.config";
import config from "../config/vars.config";

export const getWebNameNotImage = async () => {
    const img = constants.IMG.NO_IMG;
    return img;
}

/**
 * Retorna una imagen default
 * @returns 
 */
export const getWebNotImage = async () => {
    const folder = `${constants.WEB.ASSETS.IMG}/${constants.IMG.NO_IMG}`;
    return folder;
}

/**
 * Retorna la imagen thumbnail
 * @returns 
 */
export const getWebThumbnailNotImage = async () => {
    const folder = `${constants.WEB.ASSETS.IMG}/${constants.IMG.NO_IMG_THUMBNAIL}`;
    return folder;
}