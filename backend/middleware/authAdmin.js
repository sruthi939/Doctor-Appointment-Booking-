import jwt from 'jsonwebtoken'

// admin authentication middleware
const authAdmin = async (req, res, next) => {
    try {
        const { atoken } = req.headers
        if (!atoken) {
            return res.json({
                success: false,
                message: "Not Authorized Login Again"
            })
        }
    } catch (error) {
        console.log
        res.json({
            success: false,
            message: error.message
        })
    }
}

export default authAdmin;