"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Room_1 = __importDefault(require("../db/models/Room"));
class RoomController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rooms = yield Room_1.default.findAll();
                return res.status(200).send({
                    status: 200,
                    message: "Rooms retrieved successfully",
                    data: rooms,
                });
            }
            catch (error) {
                if (error instanceof Error) {
                    return res.status(400).send({
                        status: 400,
                        message: error.message,
                    });
                }
                return res.status(500).send({
                    status: 500,
                    message: "Internal server error",
                    errors: error,
                });
            }
        });
    }
    show(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const room = yield Room_1.default.findByPk(req.params.id);
                if (!room) {
                    return res.status(404).send({
                        status: 404,
                        message: "Room not found",
                    });
                }
                return res.status(200).send({
                    status: 200,
                    message: "Room retrieved successfully",
                    data: room,
                });
            }
            catch (error) {
                if (error instanceof Error) {
                    return res.status(400).send({
                        status: 400,
                        message: error.message,
                    });
                }
                return res.status(500).send({
                    status: 500,
                    message: "Internal server error",
                    errors: error,
                });
            }
        });
    }
    store(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const room = yield Room_1.default.create(req.body);
                return res.status(201).send({
                    status: 201,
                    message: "Room created successfully",
                    data: room,
                });
            }
            catch (error) {
                if (error instanceof Error) {
                    return res.status(400).send({
                        status: 400,
                        message: error.message,
                    });
                }
                return res.status(500).send({
                    status: 500,
                    message: "Internal server error",
                    errors: error,
                });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const room = yield Room_1.default.findByPk(req.params.id);
                if (!room) {
                    return res.status(404).send({
                        status: 404,
                        message: "Room not found",
                    });
                }
                yield room.update(req.body);
                return res.status(200).send({
                    status: 200,
                    message: "Room updated successfully",
                    data: room,
                });
            }
            catch (error) {
                if (error instanceof Error) {
                    return res.status(400).send({
                        status: 400,
                        message: error.message,
                    });
                }
                return res.status(500).send({
                    status: 500,
                    message: "Internal server error",
                    errors: error,
                });
            }
        });
    }
}
exports.default = RoomController;
