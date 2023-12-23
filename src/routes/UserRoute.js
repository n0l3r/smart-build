"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const validation_1 = require("../middleware/validation");
const middleware_1 = require("../middleware");
const userRoutes = express_1.default.Router();
const UserValidator = new validation_1.UserValidation();
const userController = new controllers_1.UserController();
userRoutes.post('/signup', UserValidator.signUp, userController.signUp);
userRoutes.post('/signin', UserValidator.signIn, userController.signIn);
userRoutes.get('/refresh-token', userController.refreshToken);
userRoutes.get('/signout', middleware_1.Authorization, userController.signOut);
userRoutes.get('/current-user', middleware_1.Authorization, userController.userDetail);
exports.default = userRoutes;
