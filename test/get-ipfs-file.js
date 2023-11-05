import axios from 'axios';
import chai from 'chai';

const expect = chai.expect;

// Describe the test suite
describe('GET All DATABASE FILES API', () => {
    it('should return a list of database files', async () => {
        try {
            // Make a GET request to your API endpoint
            const response = await axios.get('http://localhost:8010/v1/file/');

            // Check the response status code (e.g. 1 for a successful request)
            expect(response.status).to.equal(200);

            // Check the response data or structure as needed
            expect(response.data.data).to.be.an('array');

        } catch (error) {
            // Handle any errors that may occur during the request
            throw error;
        }
    });
});
