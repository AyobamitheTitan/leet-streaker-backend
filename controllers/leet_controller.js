"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.acceptFriend = exports.getMessages = exports.myFriends = exports.sendFriendRequest = exports.allFriends = exports.beginStreak = exports.getStreak = exports.getID = void 0;
const is_same_day_1 = __importStar(require("../helpers/is_same_day"));
const get_leetcode_user_1 = require("../helpers/get_leetcode_user");
const http_status_codes_1 = require("http-status-codes");
const User_1 = __importDefault(require("../models/User"));
const daye_constructor_1 = __importDefault(require("../helpers/daye_constructor"));
const is_same_day_2 = require("../helpers/is_same_day");
const getID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.params;
    if (!username) {
        return res.status(http_status_codes_1.StatusCodes.OK).json({ id: "00000000" });
    }
    const getUser = yield User_1.default.findOne({ username });
    if (!getUser) {
        return res.status(http_status_codes_1.StatusCodes.OK).json({ id: "00000000" });
    }
    return res
        .status(http_status_codes_1.StatusCodes.OK)
        .json({ id: getUser.hashId, streak: getUser.streak });
});
exports.getID = getID;
const getStreak = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.params;
    if (!username) {
        return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ error: "No such user" });
    }
    const getUser = yield User_1.default.findOne({ username });
    if (!getUser) {
        return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ error: "No such user" });
    }
    let lastSolvedDate = getUser.lastSolvedDate; // as unknown as string
    let newDate = new Date(lastSolvedDate);
    if ((0, is_same_day_1.compareDays)((0, daye_constructor_1.default)(newDate), (0, is_same_day_2.Today)())) {
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            streak: getUser.streak,
            maxStreak: getUser.maxStreak,
            positive: true,
            message: "Keep it burning yeah, that's the motto.",
        });
    }
    // !TODO Implement this in a try/catch
    const user = yield (0, get_leetcode_user_1.get_leetcode_user)(username);
    const recentSubs = user.recentSubmissionList;
    for (let i = 0; i < recentSubs.length; i++) {
        if ((0, is_same_day_1.default)(recentSubs[i].timestamp) &&
            recentSubs[i].statusDisplay === "Accepted") {
            if (!getUser.solvedToday &&
                (0, daye_constructor_1.default)((getUser === null || getUser === void 0 ? void 0 : getUser.lastSolvedDate)
                    ? new Date(getUser.lastSolvedDate)
                    : new Date()) === (0, is_same_day_1.Yesterday)()) {
                getUser.solvedToday = true;
                getUser.lastSolvedDate = new Date();
                getUser.streak += 1;
                yield getUser.save();
                return res.status(http_status_codes_1.StatusCodes.OK).json({
                    streak: getUser.streak,
                    maxStreak: getUser.maxStreak,
                    positive: true,
                    message: "Keep it burning,yeah that's the motto",
                });
            }
            else if (!getUser.solvedToday) {
                getUser.solvedToday = true;
                getUser.lastSolvedDate = new Date();
                getUser.streak += 1;
                yield getUser.save();
                return res.status(http_status_codes_1.StatusCodes.OK).json({
                    streak: getUser.streak,
                    maxStreak: getUser.maxStreak,
                    positive: true,
                    message: "Keep it burning,yeah that's the motto",
                });
            }
        }
        if ((0, is_same_day_1.default)(recentSubs[i].timestamp) &&
            recentSubs[i].statusDisplay !== "Accepted") {
            getUser.solvedToday = false;
            getUser.save();
            return res.status(http_status_codes_1.StatusCodes.OK).json({
                streak: getUser.streak,
                maxStreak: getUser.maxStreak,
                positive: true,
                message: "You're doing really well. Take a break and come back in a bit.",
            });
        }
    }
    getUser.solvedToday = false;
    getUser.save();
    return res.status(http_status_codes_1.StatusCodes.OK).json({
        streak: getUser.streak,
        maxStreak: getUser.maxStreak,
        positive: false,
        message: "Solve some leetcode to get on the board",
    });
});
exports.getStreak = getStreak;
const beginStreak = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.params;
    if (!username) {
        return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ error: "No such error" });
    }
    const getUser = yield User_1.default.findOne({ username });
    if (!getUser) {
        return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ error: "No such error" });
    }
    const user = yield (0, get_leetcode_user_1.get_leetcode_user)(username);
    const recentSubs = user.recentSubmissionList;
    for (let i = 0; i < recentSubs.length; i++) {
        if ((0, is_same_day_1.default)(recentSubs[i].timestamp) &&
            recentSubs[i].statusDisplay === "Accepted") {
            getUser.solvedToday = true;
            getUser.streak += 1;
            yield getUser.save();
            return res.status(http_status_codes_1.StatusCodes.OK).json({
                streak: getUser.streak,
                maxStreak: getUser.maxStreak,
                positive: true,
                message: "Keep it burning,yeah that's the motto",
            });
        }
    }
    return res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json({
        error: "You can only begin a streak if you've solved a leetcode problem",
        message: "Solve some leetcode to get on the board",
        streak: getUser.streak,
    });
});
exports.beginStreak = beginStreak;
const allFriends = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { hash } = req.body;
    if (hash === " ") {
        return res.status(http_status_codes_1.StatusCodes.OK).json({ users: [] });
    }
    const findUser = yield User_1.default.find({ hashId: { $regex: `${hash}` } });
    if (!findUser) {
        return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ user: [] });
    }
    return res.status(http_status_codes_1.StatusCodes.OK).json({ users: findUser });
});
exports.allFriends = allFriends;
const myFriends = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.params;
    const findUser = yield User_1.default.findOne({ username });
    if (!findUser) {
        return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ error: "No such user" });
    }
    return res.status(http_status_codes_1.StatusCodes.OK).json({ friends: findUser.friends });
});
exports.myFriends = myFriends;
const sendFriendRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g;
    const { params: { username }, body: { userHash }, } = req;
    const getUser = yield User_1.default.findOne({ username });
    console.log(userHash, username);
    if (!getUser) {
        return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ error: "No such user" });
    }
    const findFriend = yield User_1.default.findOne({ hashId: userHash });
    if (!findFriend) {
        return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ error: "No such user" });
    }
    if (findFriend.hashId === getUser.hashId) {
        return res.status(http_status_codes_1.StatusCodes.OK).json({ message: "NO" });
    }
    for (let index = 0; index < ((_a = getUser.messages) === null || _a === void 0 ? void 0 : _a.length); index++) {
        if (((_c = (_b = getUser.messages) === null || _b === void 0 ? void 0 : _b.at(index)) === null || _c === void 0 ? void 0 : _c.secondary) === findFriend.hashId &&
            ((_e = (_d = getUser.messages) === null || _d === void 0 ? void 0 : _d.at(index)) === null || _e === void 0 ? void 0 : _e.what) === "FRIEND REQUEST") {
            return res.status(http_status_codes_1.StatusCodes.OK).json({ message: "OK" });
        }
    }
    (_f = findFriend.messages) === null || _f === void 0 ? void 0 : _f.push({
        message: "You have a friend request from ",
        secondary: getUser.hashId,
        what: "FRIEND REQUEST",
        gotten: "FROM",
        username: getUser.username,
    });
    (_g = getUser.messages) === null || _g === void 0 ? void 0 : _g.push({
        message: "You sent a friend request to ",
        secondary: findFriend.hashId,
        what: "FRIEND REQUEST",
        gotten: "TO",
        username: findFriend.username,
    });
    getUser.save();
    findFriend.save();
    return res
        .status(http_status_codes_1.StatusCodes.OK)
        .json({ message: "Your friend request has been sent." });
});
exports.sendFriendRequest = sendFriendRequest;
const acceptFriend = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _h, _j, _k, _l;
    const { params: { username }, body: { hash }, } = req;
    const getUser = yield User_1.default.findOne({ username });
    if (!getUser) {
        return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ error: "No such user" });
    }
    const newFriend = yield User_1.default.findOne({ hashId: hash });
    if (!newFriend) {
        return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ error: "No such user" });
    }
    let friendObj = {
        username: newFriend.username,
        hashId: newFriend.hashId,
    };
    for (let index = 0; index < ((_h = getUser.friends) === null || _h === void 0 ? void 0 : _h.length); index++) {
        if (((_j = getUser.friends) === null || _j === void 0 ? void 0 : _j.at(index).username) === friendObj.username) {
            return res.status(http_status_codes_1.StatusCodes.OK).json({ message: "Already Friends" });
        }
    }
    (_k = getUser.friends) === null || _k === void 0 ? void 0 : _k.push(friendObj);
    (_l = newFriend.friends) === null || _l === void 0 ? void 0 : _l.push({
        username: getUser.username,
        hashId: newFriend.hashId,
    });
    getUser.save();
    newFriend.save();
    return res.status(http_status_codes_1.StatusCodes.OK).json({ message: "OK" });
});
exports.acceptFriend = acceptFriend;
const getMessages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.params;
    const getUser = yield User_1.default.findOne({ username });
    if (!getUser) {
        return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json({ error: "No such user" });
    }
    return res.status(http_status_codes_1.StatusCodes.OK).json({ messages: getUser.messages });
});
exports.getMessages = getMessages;
