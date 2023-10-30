import express from "express";
import bcrypt from "bcrypt";
import passport from "passport";
import { randomUUID } from "crypto";
import { User } from "../types/User";
import { registerUser } from "../controller/user/registerUser";
import generateJwtToken from "../utils/generateJwtToken";
import { loginUser } from "../controller/user/loginUser";
const router = express.Router();

router.post("/register", registerUser);

router.post("/loginjwt", loginUser);

router.post(
	"/checkAuth",
	passport.authenticate("jwt", { session: false }),
	function (req, res) {
		res.send(req.user);
	}
);
export { router as authRouter };
