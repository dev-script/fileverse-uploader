/*
    * @file connection.js
    * @summary Exposes method for connecting to mongoDB
*/
import mongoose from 'mongoose';
import { constants } from '../config/index.js';

/*
    * Method for connecting to mongoDB
*/
export const connectToMongoDb = () => {
    mongoose.connect(constants.MONGO_URI);

    mongoose.connection.on('connected', () => {
        const loggerObject = {
            fileName: "connection.js",
            methodName: "connectToMongoDb-connected",
            type: constants.LOGGER_LEVELS.INFO,
            message: 'MongoDb connected on port 27017',
        };
        global.logger(loggerObject);
        console.log('MongoDb connected on port 27017');
    });
    mongoose.connection.on('error', (err) => {
        const loggerObject = {
          fileName: "connection.js",
          methodName: "connectToMongoDb-error",
          type: constants.LOGGER_LEVELS.ERROR,
          error: err,
        };
        global.logger(loggerObject);
        console.log(`An error occurred. ERROR: ${err}`);
    });
    mongoose.connection.on('disconnected', () => {
        const loggerObject = {
            fileName: "connection.js",
            methodName: "connectToMongoDb-disconnected",
            type: constants.LOGGER_LEVELS.INFO,
            message: 'MongoDb disconnected!',
        };
        global.logger(loggerObject);
        console.log('Mongodb disconnected!');
    });
};
