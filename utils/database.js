const Sequelize = require("sequelize")
const sequelize = new Sequelize("expdb", "root", "Anujkumar@1", {
    host: "localhost",
    dialect: "mysql"

})

module.exports = sequelize