const Razorpay = require("razorpay");
const Order = require("../models/order");
const User = require("../models/user2");
const expenseTable = require("../models/expense");
const jwt = require("jsonwebtoken");
const sequelize = require("../utils/database");



const buyPremiumGetReq = async (req, res) => {
  try {
    var rzp = new Razorpay({
      key_id: "rzp_test_SvJJu8AULdC51n",
      key_secret: "xoVWWSF3EmNyT4oK6YZKLEno",
    });

    const amount = 5000;
    rzp.orders.create({ amount, currency: "INR" }, async (err, order) => {
      try {
        if (err) {
          throw new Error(JSON.stringify(err));
        }
        console.log(req.user);
        const data = await Order.create({
          orderid: order.id,
          status: "PENDING",
          userInfoId: req.user.userId,
        });
        res
          .status(201)
          .json({ order, key_id: rzp.key_id, status: "PENDING", data });
      } catch (error) {
        throw new Error(JSON.stringify(err));
      }
    });
  } catch (error) {
    console.log("Something went wrong in buyPremiumGetReq");
  }
};

const updatePremiumReqSuccess = async function (req, res) {
  try {
    const token = req.header("Authorization");
    console.log(token);
    console.log("req.user", req.user);
    const { order_id, payment_id } = req.body;
    const response = await Order.findOne({ where: { orderid: order_id } });
    const promise1 = await response.update({
      paymentstatus: payment_id,
      status: "SUCESSFULL",
    });
    const promise2 = await User.findOne({ where: { id: req.user.userId } });
    const promise3 = await promise2.update({ ispremiumuser: true });
    console.log(promise3.ispremiumuser);
    res
      .status(200)
      .json({
        sucess: true,
        message: "you are a premium user",
        promise3,
        token: jwt.sign(
          {
            userId: req.user.userId,
            name: req.user.name,
            ispremiumuser: promise3.ispremiumuser,
          },
          "AK47"
        ),
      });
  } catch (error) {
    throw new Error(err);
  }
};

const updatePremiumReqFailed = async function (req, res) {
  try {
    const { order_id, payment_id } = req.body;
    const response = await Order.findOne({ where: { orderid: order_id } });
    const promise1 = await response.update({
      paymentstatus: payment_id,
      status: "Failed",
    });

    res.status(200).json({ sucess: false, message: "Transaction Failed" });
  } catch (error) {
    throw new Error(err);
  }
};

const getAllLeaderboardUser = async function (req, res) {
  try {
    const arrOfAllUsers = await User.findAll({
      order: [["totalCost", "DESC"]],
    });

    res.status(200).json({ arrOfAllUsers });
  } catch (error) {
    console.log(error);
    throw new Error("Problem in getAllLeaderboardUser");
  }
};
module.exports = {
  buyPremiumGetReq,
  updatePremiumReqSuccess,
  updatePremiumReqFailed,
  getAllLeaderboardUser,
};
