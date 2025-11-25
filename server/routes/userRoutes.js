import express from "express";
import { protect } from "../middleware/auth.js";
import {
  discoverUser,
  followUser,
  getUserData,
  unfollowUser,
  updateUserData,
  getUserConnections,
  acceptConnectionRequest,
  sendConnectionRequest,
} from "../controllers/usercontroller.js";

import { upload } from "../configs/multer.js";

const userRouter = express.Router();

// Get logged-in user data
userRouter.get("/data", protect, getUserData);

// Update user profile
userRouter.post(
  "/update",
  upload.fields([
    { name: "profile", maxCount: 1 },
    { name: "cover", maxCount: 1 },
  ]),
  protect,
  updateUserData
);

// Follow a user
userRouter.post("/follow", protect, followUser);

// Unfollow a user
userRouter.post("/unfollow", protect, unfollowUser);

// Discover users
userRouter.post("/discover", protect, discoverUser);

// Connections
userRouter.get("/connections", protect, getUserConnections);
userRouter.post("/accept", protect, acceptConnectionRequest);
userRouter.post("/connect", protect, sendConnectionRequest);

export default userRouter;
