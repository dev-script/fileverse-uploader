import 'dotenv/config';

import express from 'express';
import helmet from 'helmet';
import path from 'path';
import morgan from 'morgan';
import log4js from 'log4js';
import bodyParser from 'body-parser';
import cors from 'cors';
import compression from 'compression';

import { loadRoutesAndMiddleware } from './utilities/server-utils.js';
import { constants } from './config/index.js';
import { connectToMongoDb } from './db/index.js';
import { logger } from './utilities/log-service.js';
import { getCurrentFilePath } from './utilities/common-utils.js';

const app = express();
const port = constants.PORT || 8443;

global.logger = logger;

app.use(helmet());
app.use(bodyParser.json({ limit: '500mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '500mb' }));
app.use(compression());
app.use(morgan('combined'));
app.use(cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    exposedHeaders: ["Content-Disposition", "FileLength"]
}));

// load all routes =========================================================
loadRoutesAndMiddleware(app);

// configuration loggers and sys log
// Use dirname to get the directory name
const currentFileURL = import.meta.url;
log4js.configure(path.join(getCurrentFilePath(currentFileURL), '../config/log-config.json'));

app.get("/ping", function (req, res) {
    res.json({ reply: "pong" });
    res.end();
});

// Event listener to catch uncaught errors
process.on('unhandledRejection', (error) => {
    console.log(error)
    const loggerObject = {
        fileName: "server.js",
        methodName: "unhandledRejection",
        type: constants.LOGGER_LEVELS.ERROR,
        error,
    };
    logger(loggerObject);
    process.exit(1);
});

// Establish mongodb connection
connectToMongoDb();

app.listen(port, () => {
    console.log('app connected to port ' + port)
})

export default app;