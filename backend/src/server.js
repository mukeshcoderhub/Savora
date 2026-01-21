import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import recipeRoutes from "./routes/recipeRoutes.js";

/* ================= CONFIG ================= */

dotenv.config();
connectDB();

const app = express();

/* ================= TRUST PROXY ================= */
// REQUIRED for Render / Railway / Vercel cookies
app.set("trust proxy", 1);

/* ================= SECURITY ================= */

app.use(helmet());

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 300, // limit each IP
    standardHeaders: true,
    legacyHeaders: false,
  })
);

/* ================= CORS ================= */

const allowedOrigins = [
  process.env.CLIENT_URL, // https://your-frontend.vercel.app
];

if (process.env.NODE_ENV !== "production") {
  allowedOrigins.push("http://localhost:5173");
  allowedOrigins.push("http://localhost:3000");
}

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow mobile apps / Expo Go (no origin)
      if (!origin) return callback(null, true);

      // Allow your web frontend
      if (origin === process.env.CLIENT_URL) {
        return callback(null, true);
      }

      return callback(new Error("CORS not allowed"), false);
    },
    credentials: true,
  })
);

/* ================= MIDDLEWARES ================= */

app.use(express.json());
app.use(cookieParser());

/* ================= ROUTES ================= */

app.get("/", (req, res) => {
  res.json({ success: true, message: "Savora API running 🚀" });
});

app.use("/api/auth", authRoutes);
app.use("/api/recipes", recipeRoutes);

/* ================= ERROR HANDLER ================= */

app.use((err, req, res, next) => {
  console.error("Global Error:", err.message);
  res.status(500).json({
    success: false,
    message: "Server error",
  });
});

/* ================= START SERVER ================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Savora backend running on port ${PORT}`);
});
