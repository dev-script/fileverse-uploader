import chai from 'chai';
import axios from 'axios';
import chaiHttp from 'chai-http';
import app from '../server.js';

const expect = chai.expect;

chai.use(chaiHttp);

describe('IPFS FILE UPLOADER', () => {
    let fileId;
    it('should upload a remote file', async () => {
        // Fetch a remote file and store it in a buffer
        const remoteFileURL = 'https://gist.githubusercontent.com/dev-script/428f71b7d5e956d0727f865612eda0e9/raw/f211340daa64ce7a2608d1d7ab053fa5e786439c/sample.txt';
        const { data: fileData } = await axios.get(remoteFileURL, { responseType: 'arraybuffer' });

        // Create a buffer with the file data
        const fileBuffer = Buffer.from(fileData, 'binary');

        // Send the file to the API endpoint
        const response = await chai.request(app)
            .post('/v1/upload')
            .attach('file', fileBuffer, 'sample.txt')

        fileId = response.body.data.fileId;
        expect(response.body.status).to.deep.equal(1);
    });

    it(`should test GET IPFS file`, async () => {
        const res = await chai.request(app)
            .get(`/v1/file/${fileId}`)
        expect(res.status).to.equal(200);
    });

    it('should test GET database file data', async () => {
        const res = await chai.request(app).get('/v1/files');
        expect(res.status).to.equal(200);
    });
});