import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectDB } from "@/gocart/lib/mongodb";
import User from "@/models/User";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  await connectDB();

  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: "All fields required" });

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
}
