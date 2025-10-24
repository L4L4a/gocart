import { connectDB } from "@/lib/mongodb";

export default async function handler(req, res) {
  try {
    await connectDB();
    res.status(200).json({
      success: true,
      message: "✅ MongoDB connection successful — your backend is working!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "❌ MongoDB connection failed",
      error: error.message,
    });
  }
}
