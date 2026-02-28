import BlacklistToken from "../models/blacklistToken.model.js";
import Captain from "../models/captain.model.js";

/**
 * @desc Register a captain
 */
export const register = async (req, res) => {
  try {
    console.log(req.body);

    const { fullname, email, password, vehicle, location } = req.body;

    // check existing
    const isCaptainExist = await Captain.findOne({ email });
    if (isCaptainExist) {
      return res.status(400).json({
        message: "captain already exist",
      });
    }

    const hashPassword = await Captain.hashPassword(password);

    const captain = await Captain.create({
      fullname,
      email,
      password: hashPassword,
      vehicle,
    });

    const token = captain.generateAuthToken();

    return res.status(201).json({
      message: "Captain Registered",
      captain,
      token,
    });
  } catch (error) {
    console.error("Error in captain register controller:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @desc Login a captain user
 */
export const login = async (req, res) => {
  const { email, password } = req.body;

  const captain = await Captain.findOne({ email }).select("+password");
  if (!captain) {
    return res.status(401).json({
      message: "User not found",
    });
  }

  const isMatch = await captain.comparePassword(password);
  if (!isMatch) {
    return res.status(400).json({
      message: "Password does not match",
    });
  }

  const token = await captain.generateAuthToken();

  res.cookie("token", token);

  return res.status(200).json({
    message: "captain Logged in successfully",
    captain,
    token,
  });
};

/**
 * @desc Captain Profile
 */
export const profile = async (req, res) => {
  const captain = req.captain;

  return res.status(200).json({
    message: "Captain profile fetch successfully",
    captain,
  });
};

/**
 * @desc Captain Logout
 */
export const logout = async (req, res) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  await BlacklistToken.create({ token });

  res.clearCookie("token");

  return res.status(200).json({
    message: "Logout Succesfully",
  });
};
