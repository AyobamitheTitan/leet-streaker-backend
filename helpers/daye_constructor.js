"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const daye_constructor = (dayte) => {
    return {
        year: dayte.getFullYear(),
        month: dayte.getMonth(),
        dayOfWeek: dayte.getDay(),
        day: dayte.getDate(),
    };
};
exports.default = daye_constructor;
