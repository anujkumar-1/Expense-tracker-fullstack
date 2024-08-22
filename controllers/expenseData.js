const expenseTable = require("../models/expense")
const User = require("../models/user2")
const jwt = require("jsonwebtoken")
const expensePostData  = async(req, res)=>{
    try {
        console.log("req.user", req.user);
        const amount = req.body.amount
        const itemDescription = req.body.itemDescription
        const category = req.body.category
        const token = req.header("Authorization")
        console.log("expensePostData :",token);
        const response = await expenseTable.create({amount:amount, itemDescription:itemDescription, category: category, userInfoId: req.user.userId})
        const updatedCost = Number(req.totalCost.totalCost) + Number(amount)
        const updatedTotalCost = await User.update({totalCost: updatedCost}, {where:{id: req.user.userId}})
        res.status(201).json({data:response, totalAmount:updatedCost, updatedTotalCost})
    } catch (error) {
        console.log(error)
    }
}


expenseGetData = async(req, res, next)=>{
    try {
        console.log("req.user :", req.user)
        const response = await expenseTable.findAll({where: {userInfoId: req.user.userId}})
        const totalAmount = await expenseTable.sum("amount", {where: {userInfoId: req.user.userId}})
        // console.log(totalAmount)
        console.log("expenseGetData response :", response)
        res.status(200).json({allData:response, totalExpense: totalAmount})
    } catch (error) {
        console.log("expenseGetData :", error)
    }
}
module.exports = {
    expensePostData,
    expenseGetData
}