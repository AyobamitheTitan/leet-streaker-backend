"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIError = void 0;
class APIError extends Error {
    constructor(statusCode, statusText) {
        super();
        this.statusCode = statusCode;
        this.statusText = statusText;
    }
}
exports.APIError = APIError;
