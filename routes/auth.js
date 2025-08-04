const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();
const router = express.Router();

// @route POST /api/register
router.post('/register', async (req, res) => {
    console.log('Register endpoint hit');
    const { name, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ msg: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        // Generate JWT token
        const payload = { userId: newUser._id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Only ONE response
        res.status(201).json({
            msg: 'User registered successfully',
            token,
            user: {
                name: newUser.name,
                email: newUser.email
            }});
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
        console.log('Error in registration:', err);
    }
});

// @route POST /api/login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log('Login endpoint hit');
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.json({
            token,
            user: { id: user._id, name: user.name, email: user.email }
        });
    } catch (err) {
        res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router; // ✅ FIXED export
