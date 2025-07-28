const bcrypt = require('bcrypt');
const User = require('../models/users.js');

// Signup with password hashing
exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Hash password

    const newUser = await User.create({ name, email, password: hashedPassword });

    res.status(201).json({ message: 'Signup successful' });
  } catch (err) {
    res.status(500).json({ error: 'Server error during signup' });
  }
};

// Login with bcrypt password verification
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: 'User not authorized' });
    }

    res.status(200).json({ message: 'User login successful' });
  } catch (err) {
    res.status(500).json({ error: 'Server error during login' });
  }
};
