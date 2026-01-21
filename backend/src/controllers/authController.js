import User from "../models/User.js";
import { verifyGoogleToken } from "../config/google.js";
import { generateToken } from "../config/jwt.js";

/* ================= COOKIE OPTIONS ================= */

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production", // HTTPS only in prod
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

/* ================= GOOGLE LOGIN ================= */

export const googleAuth = async (req, res) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({ message: "Google token missing" });
    }

    const payload = await verifyGoogleToken(idToken);

    const { sub, email, name, picture } = payload;

    let user = await User.findOne({ googleId: sub });

    if (!user) {
      user = await User.create({
        googleId: sub,
        email,
        name,
        avatar: picture,
      });
    }

    const token = generateToken(user._id);

    res.cookie("token", token, cookieOptions);

    return res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        isAdmin: user.isAdmin,
      },
    });
  } catch (error) {
    console.error("Google Auth Error:", error);
    return res.status(401).json({ message: "Authentication failed" });
  }
};

/* ================= CHECK LOGIN ================= */

export const checkLogin = async (req, res) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ user: null });
    }

    const user = await User.findById(req.user.id).select(
      "_id name email avatar isAdmin"
    );

    if (!user) {
      return res.status(401).json({ user: null });
    }

    return res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        isAdmin: user.isAdmin,
      },
    });
  } catch (error) {
    console.error("Check Login Error:", error);
    return res.status(401).json({ user: null });
  }
};

/* ================= LOGOUT ================= */

export const logout = (req, res) => {
  res.clearCookie("token", cookieOptions);

  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};
