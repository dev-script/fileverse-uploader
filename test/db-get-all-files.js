import chai from 'chai';
import supertest from 'supertest';
import chaiHttp from 'chai-http';
import app from '../server.js';

const expect = chai.expect;

chai.use(chaiHttp);

function printRoutes(stack, parent) {
    stack.forEach((layer) => {
        if (layer.route) {
            // Route endpoints
            console.log(`Route: ${parent}${layer.route.path}`);
        } else if (layer.name === 'router' && layer.handle.stack) {
            // Sub-routers
            printRoutes(layer.handle.stack, parent + layer.regexp);
        }
    });
}

describe('Your API Tests', () => {
    // Print all routes before running tests
    before(() => {
        console.log('All Routes:');
        printRoutes(app._router.stack, '');
    });

    it('should test something', (done) => {
        // Your test case logic here
    });

    // Add more test cases as needed
});

describe('GET All DATABASE FILES API', () => {
    it('should test GET /ping', async () => {
        const res = await chai.request(app)
            .get('/ping')
        expect(res.status).to.equal(200);
    });
});