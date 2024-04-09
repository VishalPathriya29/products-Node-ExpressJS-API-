"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config");
const dbUrl = process.env.DB_URL;
const options = {
    useNewUrlParser: true,
};
mongoose_1.default.connect(dbUrl, options)
    .then(() => console.log('MongoDB Database is connected successfully !'))
    .catch(err => console.error('Error connecting to MongoDB:', err));
exports.default = mongoose_1.default;
