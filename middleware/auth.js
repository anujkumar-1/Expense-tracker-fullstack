const jwt = require("jsonwebtoken")
const User = require("../models/user2")

const auth = async (req, res, next)=>{
    try {
        const token = req.header("Authorization")
        console.log(token);

        const user= jwt.verify(token, "AK47")

        console.log(user)
        const totalCost = await User.findByPk(user.userId)
        console.log("totalCost :", totalCost)
        req.totalCost = totalCost
        req.user = user
        console.log("UserID", user.userId);
        next()
    } catch (error) {
        console.log("auth :", error)
        res.status(500).json({message: "internal server error"})
    }
    



}

module.exports={
    auth
}