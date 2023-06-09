"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const APIError_1 = require("../error/APIError");
const http_status_codes_1 = require("http-status-codes");
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeaders = req.headers.authorization;
    if (!authHeaders || !authHeaders.startsWith('Bearer')) {
        return next(new APIError_1.APIError(http_status_codes_1.StatusCodes.UNAUTHORIZED, "You are unauthorized to view this page"));
    }
    if (authHeaders.split(' ').length < 2 || authHeaders.split(' ')[1] === null) {
        return next(new APIError_1.APIError(http_status_codes_1.StatusCodes.UNAUTHORIZED, "You are unauthorized to view this page"));
    }
    const bearerToken = authHeaders.split(' ')[1];
    try {
        const payload = (0, jsonwebtoken_1.verify)(bearerToken, process.env.JWT_SECRET);
        if (!payload) {
            return next(new APIError_1.APIError(http_status_codes_1.StatusCodes.UNAUTHORIZED, "You are unauthorized to view this page"));
        }
        req.user = { userId: payload.userId, name: payload.name };
    }
    catch (error) {
        return next(new APIError_1.APIError(http_status_codes_1.StatusCodes.UNAUTHORIZED, "You are unauthorized to view this page"));
    }
    return next();
});
exports.default = authMiddleware;
