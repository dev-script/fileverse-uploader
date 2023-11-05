import multer from 'multer';
import { validationResult } from 'express-validator';
import rateLimit from 'express-rate-limit';
import { constants, message } from '../../config/index.js';
import { logFunction } from '../../utilities/common-utils.js';
import { uploadFile, fetchFileContent, getAllDbFiles } from './file.controller.js';
import { validate } from './file.validation.js';

const { SUCCESS, ERROR, LOGGER_LEVELS } = constants;

// Configure multer with multer-memory-storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

export default function (app) {

    app.route('/v1/upload').post(
        limiter,
        upload.single('file'),
        validate('file-upload'),
        async(req,res) => {
            try {
                // check request middleware error
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return logFunction({
                        res,
                        requestId: req._id,
                        fileName: 'file.route.js',
                        methodName: 'uploadFile',
                        type: LOGGER_LEVELS.ERROR,
                        statusCode: ERROR.BAD_REQUEST.CODE,
                        message: errors.array({ onlyFirstError: true })[0].msg,
                        error: errors.array({ onlyFirstError: true })[0]
                    })
                };
                const { file } = req;
                const uploadedFileResponse = await uploadFile(file)
                logFunction({
                    onlyLog: true,
                    res,
                    requestId: req._id,
                    fileName: 'file.route.js',
                    methodName: 'uploadFile',
                    type: LOGGER_LEVELS.INFO,
                    message: `file ${file.name} uploaded successfully}`,
                })
                return res.status(SUCCESS.CODE).send({ status: 1, message: message.FILE_UPLOADED_SUCCESSFULLY, data: uploadedFileResponse });
            } catch (error) {
                return logFunction({
                    res,
                    requestId: req._id,
                    fileName: 'file.route.js',
                    methodName: 'uploadFile',
                    type: LOGGER_LEVELS.ERROR,
                    statusCode: ERROR.INTERNAL_SERVER_ERROR.CODE,
                    message: error.message || message.INTERNAL_SERVER_ERROR,
                    error,
                });
            }
        }
    )

    app.route('/v1/file/:fileId').get(
        limiter,
        validate('file-id'),
        async(req,res) => {
            try {
                // check request middleware error
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return logFunction({
                        res,
                        requestId: req._id,
                        fileName: 'file.route.js',
                        methodName: 'getFileById',
                        type: LOGGER_LEVELS.ERROR,
                        statusCode: ERROR.BAD_REQUEST.CODE,
                        message: errors.array({ onlyFirstError: true })[0].msg,
                        error: errors.array({ onlyFirstError: true })[0]
                    })
                };
                const { fileId } = req.params;
                const file = await fetchFileContent(fileId);
                logFunction({
                    onlyLog: true,
                    res,
                    requestId: req._id,
                    fileName: 'file.route.js',
                    methodName: 'getFileById',
                    type: LOGGER_LEVELS.INFO,
                    message: `${message.FILE_FETCHED_SUCCESSFULLY} - ${fileId}`,
                })
                return res.status(SUCCESS.CODE).send({ status: 1, message: message.FILE_DOWNLOADED_SUCCESSFULLY, data: file });
            } catch (error) {
                console.log(error)
                return logFunction({
                    res,
                    requestId: req._id,
                    fileName: 'file.route.js',
                    methodName: 'getFileById',
                    type: LOGGER_LEVELS.ERROR,
                    statusCode: ERROR.INTERNAL_SERVER_ERROR.CODE,
                    message: error.message || message.INTERNAL_SERVER_ERROR,
                    error,
                });
            }
        }
    )

    app.route('/v1/files').get(
        limiter,
        async(req,res) => {
            try {
                const files = await getAllDbFiles();
                return res.status(SUCCESS.CODE).send({ status: 1, message: message.FILE_FETCHED_SUCCESSFULLY, data: files });
            } catch (error) {
                return logFunction({
                    res,
                    requestId: req._id,
                    fileName: 'file.route.js',
                    methodName: 'getAllDbFiles',
                    type: LOGGER_LEVELS.ERROR,
                    statusCode: ERROR.INTERNAL_SERVER_ERROR.CODE,
                    message: error.message || message.INTERNAL_SERVER_ERROR,
                    error,
                });
            }
        }
    )
};