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
const User_1 = __importDefault(require("../db/models/User"));
const helpers_1 = require("../helpers");
const passwordHelper = new helpers_1.PasswordHelper();
class UserController {
    signUp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const password = yield passwordHelper.hash(req.body.password);
                const user = yield User_1.default.create({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: password,
                });
                return res
                    .status(201)
                    .send((0, helpers_1.ResponseData)(201, "User created successfully", user, null));
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
    signIn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield User_1.default.findOne({
                    where: {
                        email: req.body.email,
                    },
                });
                if (!user) {
                    return res
                        .status(400)
                        .send((0, helpers_1.ResponseData)(400, "Email not found", null, null));
                }
                const passwordMatch = yield passwordHelper.compare(req.body.password, user.password);
                if (!passwordMatch) {
                    return res
                        .status(400)
                        .send((0, helpers_1.ResponseData)(400, "Password is incorrect", null, null));
                }
                const generateToken = new helpers_1.GenerateToken();
                const dataUser = {
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                };
                const token = yield generateToken.generate(dataUser);
                const refreshToken = yield generateToken.refresh(dataUser);
                user.accessToken = token;
                yield user.save();
                res.cookie("refreshToken", refreshToken, {
                    maxAge: 24 * 60 * 60 * 1000,
                    httpOnly: true,
                    secure: true,
                    sameSite: "none",
                });
                const responseUser = {
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    token: token,
                };
                return res
                    .status(200)
                    .send((0, helpers_1.ResponseData)(200, "User signed in successfully", responseUser, null));
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
    refreshToken(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const refreshToken = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.refreshToken;
                if (!refreshToken) {
                    return res
                        .status(401)
                        .send((0, helpers_1.ResponseData)(401, "Unauthorized", null, null));
                }
                const generateToken = new helpers_1.GenerateToken();
                const payload = yield generateToken.verifyRefresh(refreshToken);
                if (!payload) {
                    return res
                        .status(401)
                        .send((0, helpers_1.ResponseData)(401, "Unauthorized", null, null));
                }
                const user = yield User_1.default.findOne({
                    where: {
                        id: payload.id,
                    },
                });
                if (!user) {
                    return res
                        .status(401)
                        .send((0, helpers_1.ResponseData)(401, "Unauthorized", null, null));
                }
                const dataUser = {
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                };
                const token = yield generateToken.generate(dataUser);
                const newRefreshToken = yield generateToken.refresh(dataUser);
                user.accessToken = token;
                yield user.save();
                res.cookie("refreshToken", newRefreshToken, {
                    maxAge: 24 * 60 * 60 * 1000,
                    httpOnly: true,
                    secure: true,
                    sameSite: "none",
                });
                const responseUser = {
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    token: token,
                };
                return res
                    .status(200)
                    .send((0, helpers_1.ResponseData)(200, "User signed in successfully", responseUser, null));
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
    signOut(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const refreshToken = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.refreshToken;
                if (!refreshToken) {
                    return res
                        .status(401)
                        .send((0, helpers_1.ResponseData)(401, "Unauthorized", null, null));
                }
                const generateToken = new helpers_1.GenerateToken();
                const payload = yield generateToken.verifyRefresh(refreshToken);
                if (!payload) {
                    return res
                        .status(401)
                        .send((0, helpers_1.ResponseData)(401, "Unauthorized", null, null));
                }
                const user = yield User_1.default.findOne({
                    where: {
                        id: payload.id,
                    },
                });
                if (!user) {
                    return res
                        .status(401)
                        .send((0, helpers_1.ResponseData)(401, "Unauthorized", null, null));
                }
                user.accessToken = null;
                yield user.save();
                res.clearCookie("refreshToken");
                return res
                    .status(200)
                    .send((0, helpers_1.ResponseData)(200, "User signed out successfully", null, null));
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
    userDetail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = res.locals.user.id;
                const user = yield User_1.default.findOne({
                    where: {
                        id: id,
                    },
                });
                if (!user) {
                    return res
                        .status(404)
                        .send((0, helpers_1.ResponseData)(404, "User not found", null, null));
                }
                return res.status(200).send((0, helpers_1.ResponseData)(200, "User detail", user, null));
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
exports.default = UserController;
