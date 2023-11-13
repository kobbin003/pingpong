import express from "express";
import passport from "passport";
import { sendFriendRequest } from "../controller/relation/sendFriendRequest";
import { acceptFriendRequest } from "../controller/relation/acceptFriendRequest";
import { rejectFriendRequest } from "../controller/relation/rejectFriendRequest";

const router = express.Router();

// send friend request
router.post(
	"/request",
	passport.authenticate("jwt", { session: false }),
	sendFriendRequest
);

// accept friend request
router.post(
	"/accept",
	passport.authenticate("jwt", { session: false }),
	acceptFriendRequest
);

// reject friend request
router.post(
	"/reject",
	passport.authenticate("jwt", { session: false }),
	rejectFriendRequest
);

export { router as relationRouter };
