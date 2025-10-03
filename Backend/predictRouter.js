import express from "express";
import Prediction from "./Prediction.js";

const router = express.Router();

// POST /predict -> Save new prediction
router.post("/predict", async (req, res) => {
  try {
    const { age, gender, symptoms, userId } = req.body;

    if (!age || !gender || !symptoms || !userId)
      return res.status(400).json({ message: "All fields are required" });

    // Call ML_service on Render
    const mlResponse = await fetch("https://ml-service-j222.onrender.com/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ age, gender, symptoms }),
    });

    if (!mlResponse.ok) {
      throw new Error(`ML service error: ${mlResponse.status}`);
    }

    const mlData = await mlResponse.json();
    const disease = mlData.prediction; // Use the prediction returned by ML service

    // Save prediction to your DB
    const newPrediction = new Prediction({
      age,
      gender,
      symptoms,
      disease,
      userId,
    });

    await newPrediction.save();

    res.json({ message: "Prediction saved", disease });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
