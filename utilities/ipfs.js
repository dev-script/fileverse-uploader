import axios from 'axios';
import FormData from 'form-data';
import path from 'path';
import fs from 'fs';
import { constants } from '../config/index.js';
import { getCurrentFilePath } from './common-utils.js';

const { IPFS_ADD_FILE_URI, IPFS_GET_FILE_URI } = constants;

const addFileToIPFS = async (file) => {
    try {
        // const fileStream = fs.createReadStream(file.buffer);
        const form = new FormData();
        form.append('file', file.buffer, { filename: file.originalname });
        const response = await axios.post(IPFS_ADD_FILE_URI, form, {
            headers: {
                ...form.getHeaders(),
            },
            maxContentLength: Infinity,
            maxBodyLength: Infinity,
        });

        const cid = response.data.Hash;
        console.log('File added to IPFS. CID:', cid);
        return cid;
    } catch (error) {
        console.error('Error adding file to IPFS:', error);
        throw error;
    }
}

const retrieveFileFromIPFS = async (fileId, dbFile) => {
    try {
        const response = await axios.get(`${IPFS_GET_FILE_URI}/${fileId}`, {
            responseType: 'stream',
        });
        if (response.status === 200) {
            const currentFileURL = import.meta.url;
            const downloadDir = path.join(getCurrentFilePath(currentFileURL), `../../files`);
            const filePath = path.join(getCurrentFilePath(currentFileURL), `../../files/${dbFile.name}`); // Define the path to save the downloaded file

            // Ensure that the download directory exists, or create it if it doesn't exist
            if (!fs.existsSync(downloadDir)) {
                fs.mkdirSync(downloadDir, { recursive: true });
            }

            const writer = fs.createWriteStream(filePath);

            response.data.pipe(writer);

            writer.on('finish', () => {
                console.log('File downloaded successfully.');
            });

            writer.on('error', (error) => {
                console.error('Error writing the file:', error);
            });
        } else {
            console.error(`Error fetching file from IPFS. Status code: ${response.status}`);
        }
        return true;
    } catch (error) {
        console.error('Error retrieving file from IPFS:', error);
    }
}

export { addFileToIPFS, retrieveFileFromIPFS }