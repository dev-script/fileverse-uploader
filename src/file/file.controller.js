import { getAllDocuments, createDocument, getDocument, updateDocument } from '../../db/controllers/index.js';
import { Files } from '../../db/models/index.js';
import { constants } from '../../config/index.js';
import { logFunction } from '../../utilities/common-utils.js';
import { addFileToIPFS, retrieveFileFromIPFS } from '../../utilities/ipfs.js';

const { LOGGER_LEVELS } = constants;

const uploadFile = async (file) => {
    try {
        let dbFile = {};
        // Upload the file to IPFS
        const fileId = await addFileToIPFS(file);

        // check if fileId exists in database
        const fileExists = await getDocument(Files, { fileId });
        if (fileExists) dbFile = await updateDocument(Files, { size: file.size, name: file.originalname })
        else dbFile = await createDocument(Files, { fileId, size: file.size, name: file.originalname })

        return dbFile;
    } catch (error) {
        logFunction({
            onlyLog: true,
            requestId: 'uploadFile',
            fileName: 'file.controller.js',
            methodName: 'uploadFile',
            type: LOGGER_LEVELS.ERROR,
            error,
        })
        throw new Error(error.message);
    }
}

const fetchFileContent = async (cid) => {
    try {
        // get db file
        const dbFile = await getDocument(Files, { fileId: cid }, { _id: 0, updated_at: 0, __v: 0 });
        // get the file from IPFS
        await retrieveFileFromIPFS(cid, dbFile);
        const { fileId, size, created_at: timestamp } = dbFile;
        return { fileId, size, timestamp };
    } catch (error) {
        logFunction({
            onlyLog: true,
            requestId: 'fetchFileContent',
            fileName: 'file.controller.js',
            methodName: 'fetchFileContent',
            type: LOGGER_LEVELS.ERROR,
            error,
        })
        throw new Error(error.message);
    }
}

const getAllDbFiles = async () => {
    try {
        const files = getAllDocuments(Files);
        return files;
    } catch (error) {
        logFunction({
            onlyLog: true,
            requestId: 'getAllDbFiles',
            fileName: 'file.controller.js',
            methodName: 'getAllDbFiles',
            type: LOGGER_LEVELS.ERROR,
            error,
        })
        throw new Error(error.message);
    }
}

export {
    uploadFile,
    fetchFileContent,
    getAllDbFiles,
}