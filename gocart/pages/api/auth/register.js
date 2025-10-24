import bcrypt from "bcryptjs";
import { connectDB } from "@/gocart/lib/mongodb";
import User from "@/models/User";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  await connectDB();

  const { username, email, password } = req.body;

  if (!username || !email || !password)
    return res.status(400).json({ message: "All fields required" });

  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, email, password: hashed });
    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
}
