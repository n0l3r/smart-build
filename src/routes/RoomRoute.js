"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const middleware_1 = require("../middleware");
const validation_1 = require("../middleware/validation");
const roomRoutes = express_1.default.Router();
const roomController = new controllers_1.RoomController();
roomRoutes.get('/', middleware_1.Authorization, roomController.index);
roomRoutes.get('/:id', middleware_1.Authorization, roomController.show);
roomRoutes.post('/', middleware_1.Authorization, validation_1.RoomValidation, roomController.store);
roomRoutes.put('/:id', middleware_1.Authorization, validation_1.RoomUpdateValidation, roomController.update);
exports.default = roomRoutes;
