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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcrypt_1 = require("bcrypt");
const jwt = __importStar(require("jsonwebtoken"));
const UserSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: [7, "The username should be made up of more than 7 characters"],
    },
    password: {
        type: String,
        required: [true, "The user must have a password"],
        minlength: 8,
    },
    solvedToday: {
        type: Boolean,
        default: false,
    },
    streak: {
        type: Number,
        default: 0,
    },
    hashId: {
        type: String,
    },
    maxStreak: {
        type: Number,
        default: 0,
    },
    lastSolvedDate: {
        type: Date,
    },
    friends: {
        type: (Array),
    },
    messages: {
        type: (Array),
    },
});
UserSchema.pre("save", function () {
    return __awaiter(this, void 0, void 0, function* () {
        const salt = yield (0, bcrypt_1.genSalt)(10);
        this.password = yield (0, bcrypt_1.hash)(this.password, salt);
        let hashId = this._id.toString();
        this.hashId = hashId.substring(0, 7);
    });
});
UserSchema.methods.compare = function (passedPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        const comp = yield (0, bcrypt_1.compare)(passedPassword, this.password);
        return comp;
    });
};
UserSchema.methods.gen_JWT = function () {
    return __awaiter(this, void 0, void 0, function* () {
        return yield jwt.sign({ userId: this._id, name: this.username }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME });
    });
};
exports.default = (0, mongoose_1.model)("User", UserSchema);
