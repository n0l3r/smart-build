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
const validatorjs_1 = __importDefault(require("validatorjs"));
const helpers_1 = require("../../helpers");
const User_1 = __importDefault(require("../../db/models/User"));
class UserValidation {
    signUp(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rules = {
                    firstName: "required|string",
                    lastName: "required|string",
                    email: "required|email",
                    password: "required|string",
                };
                const validator = new validatorjs_1.default(req.body, rules);
                if (validator.fails()) {
                    return res
                        .status(400)
                        .send((0, helpers_1.ResponseData)(400, "Validation error", null, validator.errors.errors));
                }
                const user = yield User_1.default.findOne({
                    where: {
                        email: req.body.email,
                    },
                });
                if (user) {
                    return res
                        .status(400)
                        .send((0, helpers_1.ResponseData)(400, "Email already exists", null, null));
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
        });
    }
    signIn(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const rules = {
                    email: "required|email",
                    password: "required|string",
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
        });
    }
}
exports.default = UserValidation;
