import jwt from 'jsonwebtoken'

// accountant authentication middleware
const authAccountant = async (req, res, next) => {
    try {
        const { actoken } = req.headers
        if (!actoken) {
            return res.json({
                success: false,
                message: "Not Authorized Login Again"
            })
        }
        const token_decode = jwt.verify(actoken, process.env.JWT_SECRET)
        req.body.accountantId = token_decode.id
        next()
    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: error.message
        })
    }
}

export default authAccountant;
