import { Router } from "express";
import {
  deleteUser,
  getAllUsers,
  getOldest3Users,
  searchByListOfIds,
  searchByNameStartAndAge,
  searchForAge,
  signin,
  signup,
  updateUser,
} from "../controller/user.controller.js";

const router = Router();
//===============================
//user end points
//===============================
router.get("/", getAllUsers);

router.get("/oldest3", getOldest3Users);

router.get("/searchByList", searchByListOfIds);

router.get("/searchBy", searchByNameStartAndAge);

router.get("/searchbetween", searchForAge);

router.post("/signup", signup);

router.post("/signin", signin);

router.patch("/:id", updateUser);

router.delete("/:id", deleteUser);

export default router;
