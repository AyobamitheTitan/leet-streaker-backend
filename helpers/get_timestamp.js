"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const get_timestamp = (user) => {
    const submissionToday = user.recentSubmissionList;
    return submissionToday[0]['timestamp'];
};
exports.default = get_timestamp;
