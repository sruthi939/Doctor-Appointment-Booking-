import jwt from 'jsonwebtoken';

const generateToken = (id) => {
    return jwt.sign(
        { id },
        process.env.JWT_SECRET || 'medicare_secret_key_super_secure_987654321',
        { expiresIn: '30d' }
    );
};

export default generateToken;
