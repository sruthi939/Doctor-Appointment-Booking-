import jwt from 'jsonwebtoken'

// accountant authentication middleware
const authAccountant = async (req, res, next) => {
    try {
        const { actoken, atoken, token } = req.headers;
        const authToken = actoken || atoken || token;

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
                req.body.accountantId = token_decode.id;
            }
            return next();
        }

        return res.json({
            success: false,
            message: "Not Authorized Login Again"
        });
    } catch (error) {
        console.log("authAccountant error:", error.message);
        res.json({
            success: false,
            message: error.message
        });
    }
};

export default authAccountant;
