"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ResponseData = (status, message, data, error) => {
    if (error instanceof Error) {
        return {
            status: status,
            message: message,
            errors: error.message,
            data: null
        };
    }
    return {
        status: status,
        message: message,
        errors: error,
        data: data
    };
};
exports.default = ResponseData;
