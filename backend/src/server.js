import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
import recipeRoutes from "./routes/recipeRoutes.js";
dotenv.config();
connectDB();

const app = express();

// Middlewares
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      // Allow localhost (any port)
      if (origin.startsWith("http://localhost")) {
        return callback(null, true);
      }

      // Allow Expo LAN (any port)
      if (origin.startsWith("http://10.211.59.179")) {
        return callback(null, true);
      }

      // Allow Expo scheme
      if (origin.startsWith("exp://")) {
        return callback(null, true);
      }

      return callback(new Error("CORS blocked"), false);
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// Routes
app.get("/", async(req, res)=> {
    res.json("Api working")
})

app.use('/api/auth', authRoutes);
app.use("/api/recipes", recipeRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Savora backend running on port ${PORT}`);
});
