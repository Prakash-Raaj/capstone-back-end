import express from "express";
import { verifyToken, isAdmin } from "../middleware/authJwt.js";
import {
  allAccess,
  userBoard,
  adminBoard,
} from "../controllers/user.controller.js";

export const userRouter = express.Router();

userRouter.get("/all", [verifyToken], allAccess);

userRouter.get("/user", [verifyToken], userBoard);

userRouter.get("/admin", [verifyToken, isAdmin], adminBoard);
