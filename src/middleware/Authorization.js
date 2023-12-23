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
const helpers_1 = require("../helpers");
const User_1 = __importDefault(require("../db/models/User"));
const Authorization = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authorization = req.headers.authorization;
        if (!authorization) {
            return res
                .status(401)
                .send((0, helpers_1.ResponseData)(401, "Unauthorized", null, null));
        }
        const token = authorization.split(" ")[1];
        console.log(token);
        if (!token) {
            return res
                .status(401)
                .send((0, helpers_1.ResponseData)(401, "Unauthorized", null, null));
        }
        const generateToken = new helpers_1.GenerateToken();
        const payload = yield generateToken.verify(token);
        if (!payload) {
            return res
                .status(401)
                .send((0, helpers_1.ResponseData)(401, "Unauthorized", null, null));
        }
        res.locals.user = payload;
        const user = yield User_1.default.findOne({
            where: {
                id: payload.id,
            },
        });
        console.log(user === null || user === void 0 ? void 0 : user.accessToken);
        if (!(user === null || user === void 0 ? void 0 : user.accessToken) || (user === null || user === void 0 ? void 0 : user.accessToken) !== token) {
            return res
                .status(401)
                .send((0, helpers_1.ResponseData)(401, "Unauthorized", null, null));
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
exports.default = Authorization;
