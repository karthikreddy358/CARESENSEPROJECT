import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

import authRouter from "./authRoutes.js";    // Signup/Login routes
import predictRouter from "./predictRouter.js"; // Prediction routes

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes
app.use("/api", authRouter);
app.use("/", predictRouter); // Prediction routes

app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
