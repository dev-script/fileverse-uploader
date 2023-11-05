import log4js from 'log4js';
import { getError } from './common-utils.js';
import { constants } from '../config/index.js';

const { LOGGER_LEVELS } = constants;

const infoLog = log4js.getLogger("info_log");
const errorLog = log4js.getLogger("error_log");
const warnLog = log4js.getLogger("warn_log");
const traceLog = log4js.getLogger("trace_log");
const markLog = log4js.getLogger("mark_log");
const debugLog = log4js.getLogger("debug_log");
const fatalLog = log4js.getLogger("fatal_log");

function createLogMsg(logMsgParams, stack=false) {
    const { requestId, fileName, methodName, error, message, identifier } = logMsgParams;

    let logMessageList = [];

    if(requestId) logMessageList.push(`[${requestId}]`);
    if(identifier) logMessageList.push(`[${identifier}]`);
    if(fileName) logMessageList.push(`[${fileName}]`);
    if(methodName) logMessageList.push(`[${methodName}]`);
    if(error){
        const errorMsg = stack ? error.stack : getError(error);
        logMessageList.push(errorMsg);
    }
    if(message) logMessageList.push(message);

    return logMessageList.join(" | ");
}

export function logger(loggerParams) {

    const { error, type = SYS_LOG_LEVELS.DEBUG } = loggerParams;

    // create log message
    let traceLogMsg = null;
    if(error) traceLogMsg = createLogMsg(loggerParams, true);
    const logMsg = createLogMsg(loggerParams);
    
    // send logs according to the type
    switch (type) {
        case LOGGER_LEVELS.INFO:
            infoLog.info(logMsg);
            break;
        case LOGGER_LEVELS.ERROR:
            errorLog.error(logMsg);
            traceLog.trace(traceLogMsg);
            break;
        case LOGGER_LEVELS.TRACE:
            traceLog2.trace(logMsg);
            break;
        case LOGGER_LEVELS.WARN:
            warnLog.warn(logMsg);
            break;
        case LOGGER_LEVELS.MARK:
            markLog.mark(logMsg);
            break;
        case LOGGER_LEVELS.FATAL:
            fatalLog.fatal(logMsg);
            break;
        default:
            debugLog.debug(logMsg);       
    }
}
