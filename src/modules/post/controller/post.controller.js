import postModel from "../../../db/models/postModel.js";
import userModel from "../../../db/models/userModel.js";

//==============================
//get All Posts
//==============================
export const getAllPosts = async (req, res) => {
  try {
    const posts = await postModel.findAll();
    return res.json({ msg: "done", posts });
  } catch (error) {
    return res.json({
      msg: "catch error",
      error: error.message,
      stack: error.stack,
    });
  }
};
//==============================
//get all posts with owners info
//==============================
export const getPostsWithOwnersInfo = async (req, res) => {
  try {
    const posts = await postModel.findAll({
      attributes: ["id", "title", "content"],
      include: { model: userModel, attributes: ["name", "email"] },
    });
    return res.json({ msg: "done", posts });
  } catch (error) {
    return res.json({
      msg: "catch error",
      error: error.message,
      stack: error.stack,
    });
  }
};
//==============================
//add post
//==============================
export const addPost = async (req, res) => {
  try {
    const { title, content, userId } = req.body;
    const user = await userModel.findOne({
      where: { id: userId },
    });
    if (user) {
      const post = await postModel.create({ title, content, userId });
      return res.json({ msg: "post added" });
    } else {
      return res.json({ msg: "invalid user id" });
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
//update post
//==============================
export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.query;
    const { title } = req.body;
    const post = await postModel.update(
      { title },
      {
        where: { id, userId },
      }
    );
    return post[0]
      ? res.json({ msg: "post updated" })
      : res.json({ msg: "invalid id or user id" });
  } catch (error) {
    return res.json({
      msg: "catch error",
      error: error.message,
      stack: error.stack,
    });
  }
};
//==============================
//delete post
//==============================
export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.query;
    const post = await postModel.destroy({
      where: { id, userId },
    });
    return post
      ? res.json({ msg: "post deleted" })
      : res.json({ msg: "invalid id or user id" });
  } catch (error) {
    return res.json({
      msg: "catch error",
      error: error.message,
      stack: error.stack,
    });
  }
};
