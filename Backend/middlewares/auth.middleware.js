import BlacklistToken from "../models/blacklistToken.model.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

/**
 * @desc Authentication Middleware
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
export const auth = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split[" "][1];

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  const isBlacklistToken = await BlacklistToken.findOne({ token });
  if (isBlacklistToken) {
    return res.status(401).json({
      message: "Your token is blacklisted, please try after",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById({ _id: decoded._id });

    if (!user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    req.user = user;

    return next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
