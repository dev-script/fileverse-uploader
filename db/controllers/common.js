/**
 * @file common.js
 * @summary Defines and exposes methods for db collection document
 * */

import { constants } from '../../config/index.js';

/**
 * Method to get document info from collection
 * @param {model} _collection
 * @param {string} condition Condition by which document data will be fetched
 * @param {object} [selection] Object with DB projection
 * */
const getDocument = async (_collection, condition = {}, selection = {}, sort = { updatedAt: -1 }) => await _collection.findOne(condition, { __v: false, password: false, ...selection }, { sort }).lean();

/**
 * Method to get all data of document info from collection
 * */
const getAllDocuments = async (_collection, condition = {}, selection = {}, sort = { updatedAt: -1 }) => await _collection.find(condition, { __v: false, password: false, ...selection }, { sort }).lean();

/**
 * Method to create document in DB
 * @param {model} _collection
 * @param {object} collectionObject collection info to save
 * */
const createDocument = async (_collection, collectionObject) => {
    try {
        const _document = new _collection(collectionObject);
        return _document.save();
    } catch (createDataError) {
        const loggerObject = {
            fileName: "common.js",
            methodName: "createDocument",
            type: constants.LOGGER_LEVELS.ERROR,
            error: createDataError
        };
        global.logger(loggerObject);
        return false;
    }
};

/**
 * Method to update document in DB
 * @param {model} _collection
 * @param {object} collectionObject User info to save
 * */
const updateDocument = (_collection, condition = {}, data = {}, options = {}) => {
    try {
        const updateOptions = { new: true, ...options }
        const _document = _collection.findOneAndUpdate(condition, data, updateOptions);
        return _document;
    } catch (updateDocumentError) {
        const loggerObject = {
            fileName: "common.js",
            methodName: "updateDocument",
            type: constants.LOGGER_LEVELS.ERROR,
            error: updateDocumentError
        };
        global.logger(loggerObject);
        return false;
    }
};

/**
 * Method to delete document in DB
 * @param {model} _collection
 * @param {string} documentId Document id
 * */
const deleteDocument = (_collections, documentId) => {
    try {
        const response = _collections.findByIdAndDelete(documentId);
        return response;
    } catch (deleteDocumentError) {
        const loggerObject = {
            fileName: "common.js",
            methodName: "deleteDocument",
            type: constants.LOGGER_LEVELS.ERROR,
            error: deleteDocumentError
        };
        global.logger(loggerObject);
        return false;
    }
};

/**
 * Method to delete mutiple documents in DB
 * @param {model} _collection
 * @param {object} condition
 * */
 const deleteManyDocument = async(_collections, condition = {}) => {
    try {
        await _collections.deleteMany(condition);
        return true;
    } catch (deleteManyDocumentError) {
        const loggerObject = {
            fileName: "common.js",
            methodName: "deleteManyDocument",
            type: constants.LOGGER_LEVELS.ERROR,
            error: deleteManyDocumentError
        };
        global.logger(loggerObject);
        return false;
    }
};

export {
    getDocument,
    getAllDocuments,
    createDocument,
    updateDocument,
    deleteDocument,
    deleteManyDocument,
};
