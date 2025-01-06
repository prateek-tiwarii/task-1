import jwt from 'jsonwebtoken';
import Admin from '../models/adminModel.js';
import User from '../models/userModel.js';

export const verifyToken = async (req, res, next) => {
  const { token } = req.body;

  if (!token) {
    return res.status(401).json({ success: false, message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret_key');
    
    let user;
    if (decoded.role === 'admin') {
      user = await Admin.findOne({ email: decoded.email });
    } else if (decoded.role === 'user') {
      user = await User.findOne({ email: decoded.email });
    }

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    req.user = user;
    req.role = decoded.role;

    next();  // This allows the next middleware or route handler to execute
  } catch (err) {
    console.error('Token verification failed:', err);
    return res.status(403).json({ success: false, message: 'Invalid or expired token' });
  }
};
