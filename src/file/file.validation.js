import { body, param } from 'express-validator';
import { Files } from '../../db/models/index.js';
import { getDocument } from '../../db/controllers/index.js';

const validate = (method) => {
    if (method === 'file-upload') {
        return [
            body('file').custom((value, { req }) => {
                    if(!req.file) return Promise.reject('File upload is required')
                    return true;
                })
        ]
    }
    if (method === 'file-id') {
        return [
            param('fileId').custom(async(value) => {
                    const file = await getDocument(Files, { fileId: value });
                    if (!file) return Promise.reject('Invalid fileId')
                    return true;
                })
        ]
    }
}

export { validate }