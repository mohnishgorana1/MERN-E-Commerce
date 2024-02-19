import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

const app = express();


// middlewares:  express.json | cors | cookieParser | morgan | 
app.use(express.json());
app.use(express.urlencoded({ extended: true}))
app.use(cookieParser());
app.use(morgan("dev"));


// default route
app.use("/ping", (req, res) => {
  res.status(200).json({
    success: true,
    message: "PONG",
  });
});


app.all("*", (req, res) => {
  res.status(404).send("404, Page NOT FOUND nhi mila page");
});

export default app;
