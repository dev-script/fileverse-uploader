import path from 'path';
import fs from 'fs';
import { getCurrentFilePath } from './common-utils.js';
import { constants } from '../config/index.js';

export const loadRoutesAndMiddleware = async function (app) {
    try {
        const currentFileURL = import.meta.url;
        const modulesPath = path.join(getCurrentFilePath(currentFileURL), "../../src");
        const modules = fs.readdirSync(path.join(getCurrentFilePath(currentFileURL), "../../src"));
        for (let i = 0, { length } = modules; i < length; i++) {
            const moduleFiles = modules[i];
            const routePath = path.join(modulesPath, moduleFiles);
            const routes = fs.readdirSync(routePath);
            for ( let fileIndex=0; fileIndex<routePath.length; fileIndex++ ) {
                const file = routes[fileIndex];
                const fileName = file.split(".");
                const modelData = fileName[1];
                if (modelData && (modelData.toLowerCase() === "route")) {
                    const filePath = path.join(routePath, file);
                    const modulePath = await import(filePath);
                    return modulePath.default(app)
                }
            }
        }
    } catch (error) {
        const loggerObject = {
            fileName: "server-utils.js",
            methodName: "loadRoutesAndMiddleware",
            type: constants.LOGGER_LEVELS.ERROR,
            error,
        };
        logger(loggerObject);
        throw new Error(`Error while loading all routes and utils file: ${error}`);
    }
};