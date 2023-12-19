import { Router } from "express";
import {
  addPost,
  deletePost,
  getAllPosts,
  getPostsWithOwnersInfo,
  updatePost,
} from "../controller/post.controller.js";

const router = Router();
//===============================
//post end points
//===============================
router.get("/", getAllPosts);

router.get("/withOwner", getPostsWithOwnersInfo);

router.post("/add", addPost);

router.patch("/:id", updatePost);

router.delete("/:id", deletePost);

export default router;
