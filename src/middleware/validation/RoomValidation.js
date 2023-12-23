"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomUpdateValidation = exports.RoomValidation = void 0;
const validatorjs_1 = __importDefault(require("validatorjs"));
const helpers_1 = require("../../helpers");
const RoomValidation = (req, res, next) => {
    try {
        const rules = {
            name: "required|string",
            description: "required|string",
            status: "required|string",
            image: "required|string",
            people_count: "required|integer",
        };
        const validator = new validatorjs_1.default(req.body, rules);
        if (validator.fails()) {
            return res
                .status(400)
                .send((0, helpers_1.ResponseData)(400, "Validation error", null, validator.errors.errors));
        }
        return next();
    }
    catch (error) {
        if (error instanceof Error) {
            return res
                .status(400)
                .send((0, helpers_1.ResponseData)(400, error.message, null, error));
        }
        return res
            .status(500)
            .send((0, helpers_1.ResponseData)(500, "Internal server error", null, error));
    }
};
exports.RoomValidation = RoomValidation;
const RoomUpdateValidation = (req, res, next) => {
    try {
        const rules = {
            name: "string",
            description: "string",
            status: "string",
            image: "string",
            people_count: "integer",
        };
        const validator = new validatorjs_1.default(req.body, rules);
        if (validator.fails()) {
            return res
                .status(400)
                .send((0, helpers_1.ResponseData)(400, "Validation error", null, validator.errors.errors));
        }
        return next();
    }
    catch (error) {
        if (error instanceof Error) {
            return res
                .status(400)
                .send((0, helpers_1.ResponseData)(400, error.message, null, error));
        }
        return res
            .status(500)
            .send((0, helpers_1.ResponseData)(500, "Internal server error", null, error));
    }
};
exports.RoomUpdateValidation = RoomUpdateValidation;
