import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("assign-5", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export const connection = async () => {
  return await sequelize
    .sync({ alter: false })
    .then(() => {
      console.log("DB connected");
    })
    .catch((error) => {
      console.log("connection failed");
    });
};
