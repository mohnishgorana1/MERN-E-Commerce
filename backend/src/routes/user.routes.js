import express from "express";
import {
  getProfile,
  login,
  logout,
  register,
  updateProfile,
} from "../controllers/user.controller.js";
import upload from "../middlewares/multer.middleware.js";
import { isLoggedIn } from "../middlewares/jwtAuth.middleware.js";

const router = express.Router();

router.post("/register", upload.single("avatar"), register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/me", isLoggedIn, getProfile);
router.put("/update", isLoggedIn, upload.single("avatar"), updateProfile);

export default router;
