"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function streak() {
    let current_streak = 0;
    let previous = new Date();
    previous.setDate(previous.getDate() - 1);
    console.log(previous);
    return current_streak;
}
exports.default = streak;
