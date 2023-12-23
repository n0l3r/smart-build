import { DataTypes, Model, Optional } from "sequelize";
import connection from "../../config/connection";

interface UserAttributes {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  accessToken?: string | null;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserInput extends Optional<UserAttributes, "id"> {}
export interface UserOutput extends Required<UserAttributes> {}

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
  public id!: number;
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public password!: string;
  public accessToken!: string | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      allowNull: false,
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    accessToken: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    tableName: "users",
    sequelize: connection,
  }
);

export default User;
