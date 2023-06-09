"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareDays = exports.Yesterday = exports.Today = void 0;
const daye_constructor_1 = __importDefault(require("./daye_constructor"));
const get_date_1 = require("./get_date");
const sameDay = (time) => {
    let timestamp = (0, get_date_1.getFullDate)(time);
    const today = Today();
    const latest_date = (0, daye_constructor_1.default)(timestamp);
    return (today.day === latest_date.day &&
        today.month === latest_date.month &&
        today.dayOfWeek === latest_date.dayOfWeek &&
        today.year === latest_date.year);
};
const Today = () => {
    return (0, daye_constructor_1.default)(new Date());
};
exports.Today = Today;
const compareDays = (day1, day2) => {
    return (day1.day === day2.day &&
        day1.month === day2.month &&
        day1.dayOfWeek === day2.dayOfWeek &&
        day1.year === day2.year);
};
exports.compareDays = compareDays;
const Yesterday = () => {
    const today = new Date();
    today.setDate(today.getDate() - 1);
    return (0, daye_constructor_1.default)(today);
};
exports.Yesterday = Yesterday;
exports.default = sameDay;
