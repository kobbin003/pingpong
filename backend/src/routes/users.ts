import express from "express";
import passport from "passport";
import { getUserProfile } from "../controller/user/getUserProfile";
import { getCurrentUserProfile } from "../controller/user/getCurrentUserProfile";
import { getUserByEmail } from "../controller/user/getUserByEmail";

const router = express.Router();

// get current user profile
router.get(
	"/profile",
	passport.authenticate("jwt", { session: false }),
	getCurrentUserProfile
);

// get a user profile
router.get(
	"/:id/profile",
	passport.authenticate("jwt", { session: false }),
	getUserProfile
);

router.get(
	"/email",
	passport.authenticate("jwt", { session: false }),
	getUserByEmail
);

export { router as userRouter };
