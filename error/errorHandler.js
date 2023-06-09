"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const APIError_1 = require("./APIError");
const errorHandler = (err, req, res, next) => {
    if (err instanceof APIError_1.APIError) {
        res.status(err.statusCode).json({ error: err.statusText });
        return next();
    }
    else {
        res
            .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ error: "Something went wrong" });
        return next();
    }
};
exports.default = errorHandler;
