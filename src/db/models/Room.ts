import { Model, DataTypes, Optional } from 'sequelize';
import connection from '../../config/connection';

interface RoomAttributes {
  id?: number;
  name?: string;
  description?: string;
  image?: string;
  status?: string;
  people_count?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface RoomInput extends Optional<RoomAttributes, 'id'> {}
export interface RoomOutput extends Required<RoomAttributes> {}

class Room extends Model<RoomAttributes, RoomInput> implements RoomAttributes {
  public id!: number;
  public name!: string;
  public description!: string;
  public image!: string;
  public status!: string;
  public people_count!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Room.init(
  {
    id: {
      allowNull: false,
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    people_count: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  },
  {
    tableName: 'rooms',
    sequelize: connection,
  }
);

export default Room;

