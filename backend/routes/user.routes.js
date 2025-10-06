import express from "express";
import { getCurrentUser, login, logout, register, VerifyOtp } from "../controllers/user.controllers.js";
import { isuserauth } from "../middlewares/isuserauth.js";

export const userRouter = express.Router();

userRouter.post("/register",register);
userRouter.post("/verifyOtp",VerifyOtp)
userRouter.post("/login",login);
userRouter.get("/get",isuserauth,getCurrentUser)
userRouter.get("/logout",logout)
