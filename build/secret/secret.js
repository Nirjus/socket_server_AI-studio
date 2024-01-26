"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.frontendUrl = exports.port = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({
    path: "./secret/.env"
});
exports.port = process.env.PORT || 5000;
exports.frontendUrl = process.env.FRONTEND_URL || "http://localhost:3000";
