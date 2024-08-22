const sequelize = require("../utils/database")
const DataTypes = require("sequelize")
const User = require("./user2")

const Order = sequelize.define("order", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    paymentstatus: DataTypes.STRING,
    orderid: DataTypes.STRING,
    status: DataTypes.STRING

})


User.hasMany(Order)
Order.belongsTo(User)

module.exports = Order