"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user_controller");
const router = (0, express_1.Router)();
router.route("/login").post(user_controller_1.login);
router.route("/signup").post(user_controller_1.sign_up);
exports.default = router;
