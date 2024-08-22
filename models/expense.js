const DataTypes = require("sequelize")
const User = require("./user2")
const sequelize = require("../utils/database")

const expenseTable = sequelize.define("expense", {
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    itemDescription:{
        type: DataTypes.STRING,
        allowNull: false

    },
    category:{
        type: DataTypes.STRING,
        allowNull: false
    }

})

User.hasMany(expenseTable)
expenseTable.belongsTo(User)

module.exports = expenseTable