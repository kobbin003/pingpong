import express from "express";
import { firebaseAuth } from "../middlware/firebaseAuth";
import { relationController } from "../controller/relationController";

const router = express.Router();

// send friend request
// PRIVATE
// query: recipientId
router.post("/request", firebaseAuth, relationController.sendFriendRequest);

// accept friend request
// PRIVATE
// params: relationsId
router.post(
	"/accept/:relationId",
	firebaseAuth,
	relationController.acceptFriendRequest
);

// reject friend request
// PRIVATE
// params: relationsId
router.post(
	"/decline/:relationId",
	firebaseAuth,
	relationController.declineFriendRequest
);

// find relations by status
// PRIVATE
// query: status - "pending" | "accepted" | "declined"
router.get("/friends", firebaseAuth, relationController.getRelationsByStatus);

export { router as relationRouter };
