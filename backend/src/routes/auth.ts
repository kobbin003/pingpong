import express from "express";
import passport from "passport";
import { registerUser } from "../controller/auth/registerUser";
import { loginUser } from "../controller/auth/loginUser";
const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

export { router as authRouter };
