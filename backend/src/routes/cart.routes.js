import express from "express";
import { addToCart, clearCart } from "../controllers/cart.controller.js";
import { isLoggedIn } from "../middlewares/jwtAuth.middleware.js";

const router = express.Router();

router.post("/addToCart", isLoggedIn, addToCart);
router.get("/clear", isLoggedIn, clearCart);

export default router;
