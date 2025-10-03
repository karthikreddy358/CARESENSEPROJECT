import mongoose from "mongoose";

const predictionSchema = new mongoose.Schema({
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  symptoms: { type: [String], required: true },
  disease: { type: String },
  userId: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const Prediction = mongoose.model("Prediction", predictionSchema);
export default Prediction;
