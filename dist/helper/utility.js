"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.utcDate = void 0;
const moment_1 = __importDefault(require("moment"));
require("moment-timezone");
require("dotenv/config");
const utcDate = () => {
    const format = "YYYY-MM-DD HH:mm:ss";
    const date = new Date();
    date.setFullYear(date.getFullYear());
    const utc = (0, moment_1.default)(date).tz('utc').format(format);
    // const utc = moment(date).tz('Asia/Kolkata').format(format);
    return utc;
};
exports.utcDate = utcDate;
// ====================================================================================================
// ====================================================================================================
