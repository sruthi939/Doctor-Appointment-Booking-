import jwt from 'jsonwebtoken'

// receptionist authentication middleware
const authReceptionist = async (req, res, next) => {
    try {
        const { rtoken, atoken, token } = req.headers;
        const authToken = rtoken || atoken || token;

        if (!authToken) {
            return res.json({
                success: false,
                message: "Not Authorized Login Again"
            });
        }
        const secret = process.env.JWT_SECRET || 'medicare_secret_key_super_secure_987654321';
        const token_decode = jwt.verify(authToken, secret);

        if (token_decode) {
            if (typeof token_decode === 'object' && token_decode.id) {
                req.body.receptionistId = token_decode.id;
            }
            return next();
        }

        return res.json({
            success: false,
            message: "Not Authorized Login Again"
        });
    } catch (error) {
        console.log("authReceptionist error:", error.message);
        res.json({
            success: false,
            message: error.message
        });
    }
};

export default authReceptionist;
