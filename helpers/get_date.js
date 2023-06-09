"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_timestamp = exports.getFullDate = void 0;
const getFullDate = (timestamp) => {
    const num_timestamp = Number(timestamp);
    const date = new Date(0);
    date.setUTCSeconds(num_timestamp);
    return date;
};
exports.getFullDate = getFullDate;
const get_timestamp = (user) => {
    const submissionToday = user.recentSubmissionList;
    return submissionToday[0]["timestamp"];
};
exports.get_timestamp = get_timestamp;
