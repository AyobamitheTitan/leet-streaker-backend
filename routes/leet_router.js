"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const leet_controller_1 = require("../controllers/leet_controller");
const leet_router = (0, express_1.Router)();
leet_router.route("/:username").get(leet_controller_1.getID);
leet_router.route("/streak/:username").get(leet_controller_1.getStreak);
leet_router.route("/streak/begin/:username").get(leet_controller_1.beginStreak);
leet_router.route("/new_friend/:username").post(leet_controller_1.acceptFriend);
leet_router.route("/friends/:username/").post(leet_controller_1.sendFriendRequest).get(leet_controller_1.myFriends);
leet_router.route("/friends/").post(leet_controller_1.allFriends);
leet_router.route("/messages/:username").get(leet_controller_1.getMessages);
exports.default = leet_router;
