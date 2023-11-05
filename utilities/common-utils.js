import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import { constants } from '../config/index.js';

const getError = (error) => {
    let result = error;
    if (error && error.message) {
        result = error.message;
    }
    return result;
}

const logFunction = (_args) => {
    const { res, requestId, fileName, methodName, error, onlyLog = false, statusCode=500, message='something went wrong', type=constants.LOGGER_LEVELS.ERROR, identifier='' } = _args;
    const loggerObject = {
        requestId,
        fileName,
        methodName,
        type,
        error,
        message,
        identifier,
    };
    global.logger(loggerObject);
    if(!onlyLog) {
        return res.status(statusCode).send({
            status: 0,
            message,
        });
    }
}

/**
 * True if provided object ID valid
 * @param {string} id 
 */
const isObjectIdValid = (id) => {
    const ObjectId = new mongoose.Types.ObjectId();
    return ObjectId.isValid(id) && new ObjectId(id) == id;
};

const getCurrentFilePath = (currentFileURL) => {
    const currentFilePath = fileURLToPath(currentFileURL);
    return currentFilePath;
}

export {
    isObjectIdValid,
    getError,
    logFunction,
    getCurrentFilePath,
};
