const DataTypes = require("sequelize")
const User = require("./user2")
const sequelize = require("../utils/database")

const Income = sequelize.define("income", {
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    description:{
        type: DataTypes.STRING,
        allowNull: false

    },
    category:{
        type: DataTypes.STRING,
        allowNull: false
    }
})


User.hasMany(Income)
Income.belongsTo(User)

module.exports = Income