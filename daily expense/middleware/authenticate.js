import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const authenticate = async (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });

  try {
    const decoded = jwt.verify(token, 'secretkey');
    req.user = await User.findByPk(decoded.userId);
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
};

export default authenticate;
