import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

  name: String,
  email: { type: String, unique: true },
  password: String, // (hash later with bcrypt)
  createdAt: { type: Date, default: Date.now },
  lastReport: { type: String },
  lastScore: { type: Number },
  levelDetails: { type: Array },
  
});
export default mongoose.model("User", userSchema);
