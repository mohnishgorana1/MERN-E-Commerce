import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

// routes imports
import userRoutes from "./routes/user.routes.js";
import productRoutes from './routes/product.routes.js'
import cartRoutes from './routes/cart.routes.js'

const app = express();

// middlewares:  express.json | cors | cookieParser | morgan |
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

// default route
app.use("/ping", (req, res) => {
  res.status(200).json({
    success: true,
    message: "PONG",
  });
});

//app routes

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/products", productRoutes)
app.use("/api/v1/cart", cartRoutes)


app.all("*", (req, res) => {
  res.status(404).send("404, Page NOT FOUND nhi mila page");
});

export default app;
