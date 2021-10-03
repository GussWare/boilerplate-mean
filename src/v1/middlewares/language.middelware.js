import Polyglot from 'node-polyglot';
import fse from "fs-extra";
import httpStatus from "http-status";
import ApiError from "../libraries/api.error.library"
import loggerHelper from '../helpers/logger.helper';


/**
 * 
 * @returns 
 */
export const loadPolyglot =  async (req, res, next) => {
	const lang = req.locale.language;
    const fullPath = `./src/v1/languages/${lang}.json`;
    

    global.polyglot = {};
    if(await fse.pathExists(fullPath) == false) {
        next(new ApiError(httpStatus.BAD_REQUEST, "Idioma File Not Found"));
    } else {
        const relatvePath = `../languages/${lang}.json`;
        const polyglot  = new Polyglot();
        const messages = require(relatvePath);
        
        await polyglot.extend(messages);

        global.polyglot = polyglot;

        next();
    }
};
