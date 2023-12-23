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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
;
class GenerateToken {
    generate(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield jsonwebtoken_1.default.sign(data, process.env.JWT_SECRET_KEY, { expiresIn: '7d' });
            return token;
        });
    }
    refresh(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield jsonwebtoken_1.default.sign(data, process.env.JWT_REFRESH_TOKEN, { expiresIn: '7d' });
            return token;
        });
    }
    verify(token) {
        return __awaiter(this, void 0, void 0, function* () {
            let resData;
            const res = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
                if (err) {
                    resData = null;
                }
                else {
                    resData = decoded;
                }
            });
            if (resData) {
                const result = (resData);
                return result;
            }
            return null;
        });
    }
    verifyRefresh(token) {
        return __awaiter(this, void 0, void 0, function* () {
            let resData;
            const res = yield jsonwebtoken_1.default.verify(token, process.env.JWT_REFRESH_TOKEN, (err, decoded) => {
                if (err) {
                    resData = null;
                }
                else {
                    resData = decoded;
                }
            });
            if (resData) {
                const result = (resData);
                return result;
            }
            return null;
        });
    }
}
exports.default = GenerateToken;
