import { Op } from "sequelize";
import userModel from "../../../db/models/userModel.js";

//==============================
//getAllUsers
//==============================
export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.findAll({
      attributes: ["name", "email"],
    });
    return res.json({ msg: "done", users });
  } catch (error) {
    return res.json({
      msg: "catch error",
      error: error.message,
      stack: error.stack,
    });
  }
};
//==============================
//get oldest 3 users
//==============================
export const getOldest3Users = async (req, res) => {
  try {
    const oldest3 = await userModel.findAll({
      order: [["age", "DESC"]],
      limit: 3,
      attributes: ["name", "email", "age"],
    });
    return res.json({ msg: "done", users: oldest3 });
  } catch (error) {
    return res.json({
      msg: "catch error",
      error: error.message,
      stack: error.stack,
    });
  }
};
//==============================
//search by list of ids
//==============================
export const searchByListOfIds = async (req, res) => {
  try {
    const ids = req.query;
    //convert ids object to array of numbers
    const idList = Object.values(ids).map((value) => +value);
    const users = await userModel.findAll({
      where: {
        id: idList,
      },
      attributes: ["name", "email"],
    });
    return res.json({ msg: "done", users });
  } catch (error) {
    return res.json({
      msg: "catch error",
      error: error.message,
      stack: error.stack,
    });
  }
};
//==============================
//search name starts with a & age < 30
//==============================
export const searchByNameStartAndAge = async (req, res) => {
  try {
    const { letter, ageLess } = req.query;
    const users = await userModel.findAll({
      where: {
        [Op.and]: [
          {
            name: {
              [Op.like]: `${letter}%`,
            },
          },
          {
            age: {
              [Op.lt]: ageLess,
            },
          },
        ],
      },
      attributes: ["name", "email", "age"],
    });
    return res.json({ msg: "done", users });
  } catch (error) {
    return res.json({
      msg: "catch error",
      error: error.message,
      stack: error.stack,
    });
  }
};
//==============================
//search for age between 20 & 30
//==============================
export const searchForAge = async (req, res) => {
  try {
    const { age1, age2 } = req.query;
    const users = await userModel.findAll({
      where: {
        age: {
          [Op.between]: [age1, age2],
        },
      },
      attributes: ["name", "email", "age"],
      order: [["age", "ASC"]],
    });
    return res.json({ msg: "done", users });
  } catch (error) {
    return res.json({
      msg: "catch error",
      error: error.message,
      stack: error.stack,
    });
  }
};
//==============================
//sign up
//==============================
export const signup = async (req, res) => {
  try {
    const { name, email, password, age } = req.body;
    const [user, created] = await userModel.findOrCreate({
      where: { email },
      defaults: {
        name,
        password,
        age,
      },
    });
    if (created) {
      return res.json({ msg: "user added" });
    } else {
      return res.json({ msg: "email already exists" });
    }
  } catch (error) {
    return res.json({
      msg: "catch error",
      error: error.message,
      stack: error.stack,
    });
  }
};
//==============================
//sign in
//==============================
export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({
      where: {
        email,
        password,
      },
    });
    if (user) {
      return res.json({ msg: "user logged in" });
    } else {
      return res.json({ msg: "invalid email or password" });
    }
  } catch (error) {
    return res.json({
      msg: "catch error",
      error: error.message,
      stack: error.stack,
    });
  }
};
//==============================
//update user
//==============================
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;
    const user = await userModel.update(
      { password },
      {
        where: {
          id,
        },
      }
    );
    return user[0]
      ? res.json({ msg: "user updated" })
      : res.json({ msg: "invalid id" });
  } catch (error) {
    return res.json({
      msg: "catch error",
      error: error.message,
      stack: error.stack,
    });
  }
};
//==============================
//delete user
//==============================
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.destroy({
      where: { id },
    });
    return user
      ? res.json({ msg: "user deleted" })
      : res.json({ msg: "invalid id" });
  } catch (error) {
    return res.json({
      msg: "catch error",
      error: error.message,
      stack: error.stack,
    });
  }
};
