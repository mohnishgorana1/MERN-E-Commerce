import express from "express";
import { addToCart } from "../controllers/cart.controller.js";
import { isLoggedIn } from "../middlewares/jwtAuth.middleware.js";

const router = express.Router();

router.post("/addToCart", isLoggedIn, addToCart);

export default router;
