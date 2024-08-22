const bcrypt = require("bcrypt")
const User = require("../models/user2")
const jwt = require("jsonwebtoken")


function generateAccessTokens(id, name, ispremiumuser, totalCost){
    const token = jwt.sign({userId: id, name:name, ispremiumuser, totalCost}, "AK47")
    
    return token
}

const signUp = async (req, res)=>{
    try {
        const username = req.body.username
        const email = req.body.email
        const password = req.body.password
        const saltrounds = 10
        bcrypt.hash(password, saltrounds, async(err, hash)=>{
            if(err){
            
                throw new Error("Something went wrong")
            }
            const data = await User.create({username: username, email: email, password: hash})
            res.status(201).json({user: data})
        })


    } catch (error) {
        console.log("signUp :", error)
    }
}

const login = async (req, res)=>{
    try {
        const email = req.body.verifyEmail
        const password = req.body.verifyPassword
        console.log(email, password)
        const user = await User.findAll({
            where: {
              email: email
            }
        });
        console.log(user.length)

        if (user.length > 0) {
            bcrypt.compare(password, user[0].password, function(err, result) {
                // result == true
                if(err){
                    throw new Error("Something went wrong")
                }
                if(result===true){
                    res.status(200).json({user: user, message: "User logged in sucessfully", token: generateAccessTokens(user[0].id, user[0].username, user[0].ispremiumuser, user[0].totalCost)});
                }
                else{
                    res.status(401).json({message: "User not authorized"});
                }
            });
            
            
        }else {
            res.status(404).json({ message: 'User not found' });
        }
        
        
    } catch (error) {
        console.log("login :", error)
    }
}


module.exports = {
    signUp, 
    login,
    generateAccessTokens
}