import { connectDB } from "@/gocart/lib/mongodb";
import User from "@/models/User";

export default async function handler(req, res) {
  try {
    await connectDB();
    const users = await User.find().limit(3);
    res.status(200).json({ message: "✅ MongoDB Connected Successfully", users });
  } catch (err) {
    res.status(500).json({ message: "❌ Connection failed", error: err.message });
  }
}
