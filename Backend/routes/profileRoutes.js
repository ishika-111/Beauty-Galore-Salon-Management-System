import express from "express";
import {
  getCustomerProfile,
  getProfile,
  createProfile,
  updateProfile,
} from "../controller/profileController.js";
import authenticateUser from "../Middleware/authMiddleware.js";

const profileRouter = express.Router();

profileRouter.get("/getprofile", authenticateUser, getCustomerProfile);
profileRouter.get("/profile", authenticateUser, getProfile);
profileRouter.post("/profile", authenticateUser, createProfile);
profileRouter.put("/profile", authenticateUser, updateProfile);

export default profileRouter;
