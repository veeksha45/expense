const User = require('../models/User');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // 2. Check if user exists
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // 3. Check if password matches
    if (user.password !== password) {
      return res.status(401).json({ error: 'User not authorized' });
    }

    // 4. Success
    res.status(200).json({ message: 'User login successful' });

  } catch (err) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};
