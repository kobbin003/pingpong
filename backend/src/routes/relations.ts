import express from "express";
import passport from "passport";
import { sendFriendRequest } from "../controller/relation/sendFriendRequest";
import { acceptFriendRequest } from "../controller/relation/acceptFriendRequest";
import { declineFriendRequest } from "../controller/relation/declineFriendRequest";
import { getFriends } from "../controller/relation/getFriends";

const router = express.Router();

// send friend request
router.post(
	"/request",
	passport.authenticate("jwt", { session: false }),
	sendFriendRequest
);

// accept friend request
router.post(
	"/accept/:relationId",
	passport.authenticate("jwt", { session: false }),
	acceptFriendRequest
);

// reject friend request
router.post(
	"/decline/:relationId",
	passport.authenticate("jwt", { session: false }),
	declineFriendRequest
);

router.get(
	"/friends/:status",
	passport.authenticate("jwt", { session: false }),
	getFriends
);

export { router as relationRouter };
