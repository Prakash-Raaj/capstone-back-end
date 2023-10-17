import express from "express";
import {
  checkDuplicateUsernameOrEmail,
  checkRolesExisted,
} from "../middleware/verifySignUp.js";
import { signup, signin } from "../controllers/auth.controller.js";

export const authRouter = express.Router();

authRouter.post(
  "/signup",
  [checkDuplicateUsernameOrEmail, checkRolesExisted],
  signup
);

authRouter.post("/signin", signin);
