import chai from 'chai';
import axios from 'axios';
import supertest from 'supertest';
import app from '../server.js';

const expect = chai.expect;

describe('File Upload API', () => {
    it('should upload a remote file', async () => {
        // Fetch a remote file and store it in a buffer
        const remoteFileURL = 'https://gist.githubusercontent.com/dev-script/428f71b7d5e956d0727f865612eda0e9/raw/f211340daa64ce7a2608d1d7ab053fa5e786439c/sample.txt';
        const { data: fileData } = await axios.get(remoteFileURL, { responseType: 'arraybuffer' });

        // Create a buffer with the file data
        const fileBuffer = Buffer.from(fileData, 'binary');

        // Send the file to the API endpoint
        const response = await supertest(app)
            .post('/v1/upload')
            .attach('file', fileBuffer, 'sample.txt')

        // For example, check the response JSON or headers
        expect(response.body).to.deep.equal({ status: 1 });
    });
});
