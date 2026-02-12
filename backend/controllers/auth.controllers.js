import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import genToken from "../utils/token.js";

export const signUp = async (req, res) => {
  try {
    const { fullName, email, password, mobile, role } = req.body;

    if (!fullName || !email || !mobile || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!["user", "admin", "deliveryBoy"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    if (mobile < 10) {
      return res.status(400).json({ message: "Mobile number must be 10 digits" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      fullName,
      email,
      mobile,
      role,
      password: hashedPassword,
    });

    const token = genToken(newUser._id);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json(newUser);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Email and password required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User does not exist" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Incorrect password" });

    const token = genToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json(user);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const signOut = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
