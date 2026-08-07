import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    } else if (req.headers.token) {
        token = req.headers.token;
    }

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET || 'medicare_secret_key_super_secure_987654321');
            const user = await User.findById(decoded.id).select('-password');
            req.user = user || { _id: decoded.id, role: 'USER' };
            return next();
        } catch (error) {
            console.error('[Auth Middleware Error]', error.message);
            return res.status(401).json({ success: false, message: 'Not authorized, token failed' });
        }
    }

    return res.status(401).json({ success: false, message: 'Not authorized, no token provided' });
};

export const adminOnly = (req, res, next) => {
    if (req.user && req.user.role === 'ADMIN') {
        next();
    } else {
        res.status(403).json({ success: false, message: 'Access denied: Admin role required' });
    }
};
