const express = require("express")
const app= express()
const bodyParser = require("body-parser")
app.use(bodyParser.json())
const cors = require("cors")
const router = require("./routes/routes")
const sequelize = require("./utils/database")


app.use(cors())

app.use(router.signup)
app.use(router.loggedIn)
app.use(router.expenseData)
app.use(router.expenseGetData)
app.use(router.buyPremiumGetReq)
app.use(router.updatePremiumReqSuccess)
app.use(router.updatePremiumReqFailed)
app.use(router.getAllLeaderboardUser)
// app.use(router.deleteElement)




sequelize.sync().then(result=>{
    app.listen(3000, ()=>{
        console.log("Server is running on port 3000")
    })

    console.log("database connected sucessfully")
}).catch(err=>{
    console.log(err)
})
