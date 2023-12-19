import { sequelize } from "../connection.js";
import { DataTypes } from "sequelize";

//creating user table
const userModel = sequelize.define("user", {
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(150),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },
  age: {
    type: DataTypes.INTEGER,
  },
});

export default userModel;
