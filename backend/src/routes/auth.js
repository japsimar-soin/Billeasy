import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();


// Signup route
router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const user = new User({ username, email, password });
    await user.save();

    // Generate token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || 'your_jwt_secret_key_here',
      { expiresIn: '24h' }
    );

    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Login route
router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Find user
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Check password
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Generate token
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET || 'your_jwt_secret_key_here',
        { expiresIn: '24h' }
      );
  
      res.json({ user, token });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  export default router;
