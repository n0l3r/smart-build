"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.roomRoutes = exports.userRoutes = void 0;
const UserRoute_1 = __importDefault(require("./UserRoute"));
exports.userRoutes = UserRoute_1.default;
const RoomRoute_1 = __importDefault(require("./RoomRoute"));
exports.roomRoutes = RoomRoute_1.default;
