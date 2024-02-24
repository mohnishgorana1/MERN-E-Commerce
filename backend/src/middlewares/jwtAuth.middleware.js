import Jwt from "jsonwebtoken";

export const isLoggedIn = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res
      .status(401)
      .json({ error: "Unauthenticated, Please Login Again!" });
  }
  
  const userDetails = await Jwt.verify(token, process.env.JWT_SECRET);
  req.user = userDetails;
  next();
};
