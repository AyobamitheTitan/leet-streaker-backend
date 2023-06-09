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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sign_up = exports.login = void 0;
const get_leetcode_user_1 = require("../helpers/get_leetcode_user");
const http_status_codes_1 = require("http-status-codes");
const User_1 = __importDefault(require("../models/User"));
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (!username || !password) {
        res
            .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
            .json({ error: "Fill in the necessary fields" });
        return;
    }
    const get_User = yield User_1.default.findOne({ username });
    if (!get_User) {
        res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ error: "User not Found" });
        return;
    }
    const match = yield get_User.compare(password.trim());
    // if (!match) {
    //   res.status(StatusCodes.BAD_REQUEST).json({ error: "Incorrect password" });
    //   return;
    // }
    const token = yield get_User.gen_JWT();
    return res.status(http_status_codes_1.StatusCodes.OK).json({ username, token });
});
exports.login = login;
const sign_up = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.username || !req.body.password) {
        return res
            .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
            .json({ error: "Please fill in the necessary fields" });
    }
    let username = req.body.username;
    username = username.trim();
    let password = req.body.password;
    password.trim();
    const get_User = yield User_1.default.findOne({ username });
    if (get_User) {
        res
            .status(http_status_codes_1.StatusCodes.BAD_REQUEST)
            .json({ error: "This user already exists" });
        return;
    }
    const user = yield (0, get_leetcode_user_1.get_leetcode_user)(username);
    if (user.matchedUser === null) {
        return res
            .status(http_status_codes_1.StatusCodes.NOT_FOUND)
            .json({ error: "No such leetcode user" });
    }
    const new_user = yield User_1.default.create({
        username,
        password,
    });
    const token = yield new_user.gen_JWT();
    return res.status(http_status_codes_1.StatusCodes.OK).json({ token, username, hashId: new_user.hashId });
});
exports.sign_up = sign_up;
