import { sequelize } from "../connection.js";
import { DataTypes } from "sequelize";
import userModel from "./userModel.js";

//creating post table
const postModel = sequelize.define("post", {
  title: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING(1000),
    allowNull: false,
  },
});

//creating relation one to many between user table and post table
userModel.hasMany(postModel, {
  foreignKey: {
    name: "userId",
    allowNull: false,
  },
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

postModel.belongsTo(userModel, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

export default postModel;
