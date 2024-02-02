import express from "express";
import { firebaseAuthRegister } from "../middlware/firebaseAuthRegister";
import { firebaseAuth } from "../middlware/firebaseAuth";
import { userController } from "../controller/userController";

const router = express.Router();

// get current user profile
// PRIVATE
router.get(
	"/profile",
	firebaseAuthRegister,
	userController.getCurrentUserProfile
);

// update current user profile
// PRIVATE
// body: { name, profilePicUrl }
router.patch("/profile", firebaseAuth, userController.updateCurrentUserProfile);

// update current user profile status
// PRIVATE
// body: { status }
router.patch(
	"/profile/status",
	firebaseAuth,
	userController.updateCurrentUserStatus
);

// delete current user profile
// PRIVATE
router.delete("/del", firebaseAuth, userController.deleteCurrentUserProfile);

// get a user profile
// params: id
router.get("/:id/profile", userController.getUserById);

//get user by email
// query: email
router.get("/email", userController.getUserByEmail);

export { router as userRouter };
