"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../../config/connection"));
class User extends sequelize_1.Model {
}
User.init({
    id: {
        allowNull: false,
        type: sequelize_1.DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    firstName: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: true,
    },
    email: {
        type: sequelize_1.DataTypes.STRING(50),
        allowNull: false,
    },
    password: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    accessToken: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true,
    },
}, {
    tableName: "users",
    sequelize: connection_1.default,
});
exports.default = User;
