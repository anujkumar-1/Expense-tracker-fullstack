const sequelize = require("../utils/database")
const DataTypes = require("sequelize")
const User = require("../models/user2")

const ForgotPassword = sequelize.define("forgotPassword", {
    id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
    },
    userId:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    isActive: DataTypes.BOOLEAN,

})

User.hasMany(ForgotPassword)
ForgotPassword.belongsTo(User)


module.exports = ForgotPassword;