import jwt from 'jsonwebtoken'

// receptionist authentication middleware
const authReceptionist = async (req, res, next) => {
    try {
        const { rtoken } = req.headers
        if (!rtoken) {
            return res.json({
                success: false,
                message: "Not Authorized Login Again"
            })
        }
        const token_decode = jwt.verify(rtoken, process.env.JWT_SECRET)
        req.body.receptionistId = token_decode.id
        next()
    } catch (error) {
        console.log(error)
        res.json({
            success: false,
            message: error.message
        })
    }
}

export default authReceptionist;
