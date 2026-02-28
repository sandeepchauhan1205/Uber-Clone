import BlacklistToken from "../models/blacklistToken.model.js";
import User from "../models/user.model.js";

/**
 * @desc    Register a new user
 * @route   POST /api/v1/user/register
 * @access  Public
 */
export const register = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exist",
      });
    }
    const user = await User.create({
      fullname: {
        firstname: fullname.firstname,
        lastname: fullname.lastname,
      },
      email,
      password,
    });

    const token = user.generateAuthToken();

    return res.status(201).json({
      message: "User registered successfully",
      user,
      token,
    });
  } catch (error) {
    console.error("Error in register controller:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @desc    Login user
 * @route   POST /api/v1/user/login
 * @access  Public
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({
        messager: "Invalid email or password",
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Password does not match",
      });
    }

    const token = user.generateAuthToken();

    res.cookie("token", token);

    return res.status(200).json({
      user,
      token,
    });
  } catch (error) {
    console.error("Error in login controller:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * @desc Check User Profile
 * @route GET  /api/v1/user/profile
 * @access Private
 */
export const profile = async (req, res) => {
  return res.status(200).json({
    user: req.user,
  });
};

/**
 * @desc User Logout
 * @route GET /api/v1/user/logout
 * @access Private
 */
export const logout = async (req, res) => {
  res.clearCookie("token");

  const token = req.cookies.token || req.headers.authorization.split(" ")[1];

  // for blacklist tokens
  await BlacklistToken.create({ token });

  return res.status(200).json({
    message: "Loggout Successfully",
  });
};
