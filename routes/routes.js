const express = require("express")
const router = express.Router()

const userControllers = require("../controllers/user")
const expenseDataControllers = require("../controllers/expenseData")
const authMiddleware = require("../middleware/auth")
const buyPremiumControllers = require("../controllers/premium")
// const deleteFromDB = require("../controllers/delete")

const signup = router.post("/signup", userControllers.signUp)

const loggedIn = router.post("/login",  userControllers.login)

const expenseData = router.post("/expenseForm",authMiddleware.auth, expenseDataControllers.expensePostData)

const expenseGetData = router.get("/expenseAllData",authMiddleware.auth ,expenseDataControllers.expenseGetData)

const buyPremiumGetReq = router.get("/buyPremiumMembership", authMiddleware.auth, buyPremiumControllers.buyPremiumGetReq)

const updatePremiumReqSuccess = router.post("/updatePremiumMembership", authMiddleware.auth, buyPremiumControllers.updatePremiumReqSuccess)

const updatePremiumReqFailed = router.post("/updateErrorPremiumMembership", authMiddleware.auth, buyPremiumControllers.updatePremiumReqFailed)


const getAllLeaderboardUser = router.get("/leaderboardAllUser", authMiddleware.auth, buyPremiumControllers.getAllLeaderboardUser)
module.exports = {
    signup,
    loggedIn,
    expenseData,
    expenseGetData,
    buyPremiumGetReq,
    updatePremiumReqSuccess,
    updatePremiumReqFailed,
    getAllLeaderboardUser
    // deleteElement
}